import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { Box, Grid, Paper, Typography, TextField, Button, Modal } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Body = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState([]);
  const [id, setId] = useState("");
  const [selectedOption, setSelectedOption] = useState("new");
  const [refreshTasks, setRefreshTasks] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [remark,setRemark] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState([]);
  const [descriptionError, setDescriptionError] = useState('')
  const fileRef = React.useRef()
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  useEffect(() => {
    
    const StoredId = localStorage.getItem("id");
    setId(StoredId)
    console.log(id)
    if (StoredId) {
      axios
        .get(`/api/view/intern-details/${StoredId}`)
        .then((response) => {
          const internId = response.data.id;
          setId(internId);
          
          axios
            .get(`/api/view/tasks/${internId}`)
            .then((tasksResponse) => {
              setTasks(tasksResponse.data);
              console.log(tasksResponse.data);
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    }
    setRefreshTasks(false);
  }, [refreshTasks]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleStatusChange = (id, status) => {
    axios.post(`api/edit/task/${id}`,{
      status : status
    })
    .then(() => {
      setRefreshTasks(true);
    })
    .catch((error) => console.error(error));
  }

  const openModal = (taskId) => {
    setSelectedTaskId(taskId)
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const handleDescriptionChange = (event) => {
    setRemark(event.target.value)
  }

  const handleFileChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0])
    setSelectedFiles(file)
    
    if (file) {
      setFormData({ ...formData, file: file })
    }
  }

  const [formData, setFormData] = React.useState({
    status:'',
    remark:'',
    file:'',
  })

  const handleSubmit = () => {

  let descriptionError = '';
  let fileError = '';

  if (!remark) {
    descriptionError = 'Description is required.';
  }

  if (descriptionError) {

    setDescriptionError(descriptionError);
    return;
  }

  setDescriptionError('');

    const file = fileRef.current.files[0]
    const _form = new FormData()
    _form.append('remark', remark)
    _form.append('status','Completed')
    if (fileRef.current.files.length > 0) {
      console.log('file ok')
      _form.append('file',file)
    }
    axios.post(`api/edit/task/${selectedTaskId}`,
    _form, {
      headers: {
        "Content-Type":"multipart/form-data"
      }
    })
    .then(() => {
      setRefreshTasks(true)
      closeModal()
    })
    .catch((error) => console.error(error))
  }

  const renderCardContents = () => {
    if (selectedOption === "new") {
      const newTasks = tasks.filter((task) => task.status === "Pending");

      if (newTasks.length === 0) {
        return (
          <Typography variant="body2" color="text.secondary">
            No tasks available.
          </Typography>
        );
      }
  
      return newTasks.map((task) => (
        <Card key={task.id} style={{ marginBottom : "10px" }}>
          <CardContent>
              <Typography key={task.id} variant="body2" color="text.secondary">
                Title: {task.title} | Description: {task.description}
              </Typography>
              <div style={{ marginTop: '10px' }}>
          {task.status === 'Pending' && (
            <button
              onClick={() => handleStatusChange(task.id, 'Ongoing')}
              style={{
                backgroundColor: "#FFFFFF",
                color: "purple",
                padding: "5px 10px",
                borderRadius: "5px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Mark as Ongoing
            </button>
          )}
          </div>
          </CardContent>
        </Card>
      ));
    } else if (selectedOption === "ongoing") {
      const ongoingTasks = tasks.filter((task) => task.status === "Ongoing");

      if (ongoingTasks.length === 0) {
        return (
          <Typography variant="body2" color="text.secondary">
            No tasks available.
          </Typography>
        );
      }
  
      return ongoingTasks.map((task) => (
        <Card key={task.id} style={{ marginBottom : "10px" }}>
          <CardContent>
              <Typography key={task.id} variant="body2" color="text.secondary">
                Title: {task.title} | Description: {task.description}
              </Typography>
              <div style={{ marginTop: '10px' }}>
          {task.status === 'Ongoing' && (
            <button
              onClick={() => {
                openModal(task.id);
              }}
              style={{
                backgroundColor: "#FFFFFF",
                color: "purple",
                padding: "5px 10px",
                borderRadius: "5px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Mark as Completed
            </button>
          )}
          </div>
          </CardContent>
        </Card>
      ));
    } else if (selectedOption === "completed") {
      const completedTasks = tasks.filter((task) => task.status === "Completed");

      if (completedTasks.length === 0) {
        return (
          <Typography variant="body2" color="text.secondary">
            No tasks available.
          </Typography>
        );
      }

      return completedTasks.map((task) => (
        <Card key={task.id} style={{ marginBottom : "10px" }}>
          <CardContent>
              <Typography key={task.id} variant="body2" color="text.secondary">
                Title: {task.title} | Description: {task.description}
              </Typography>
          </CardContent>
        </Card>
      ));
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#5584B0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column", 
        alignItems: "center",
        paddingTop: "75px",
      }}
    >
      <Grid item xs={12} md={6} sx={{ marginBottom: "20px" }}>
        <Typography variant="h4" sx={{ color: "#CBE3EF" }}>
          Tasks
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: "50%", alignSelf: "center" }}>
        <Paper sx={{ padding: 2 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <button
              onClick={() => handleOptionChange("new")}
              style={{
                backgroundColor: "#5584B0",
                color: "#FFFFFF",
                padding: "10px 20px",
                borderRadius: "5px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                border: "none",
                cursor: "pointer",
              }}
            >
              New Task
            </button>
            <button
              onClick={() => handleOptionChange("ongoing")}
              style={{
                backgroundColor: "#5584B0",
                color: "#FFFFFF",
                padding: "10px 20px",
                borderRadius: "5px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Ongoing
            </button>

            <button
              onClick={() => handleOptionChange("completed")}
              style={{
                backgroundColor: "#5584B0",
                color: "#FFFFFF",
                padding: "10px 20px",
                borderRadius: "5px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Completed
            </button>
          </div>
          {renderCardContents()}
        </Paper>
      </Grid>
      <Modal open={modalOpen} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          minWidth: 300,
          maxWidth: 500,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Mark as Completed
        </Typography>
        <TextField
          label="Description"
          name= 'remark'
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={remark}
          onChange={handleDescriptionChange}
          helperText={descriptionError}
        />
          <input
            type="file"
            name="file"
            multiple
            onChange={handleFileChange}
            ref={fileRef}
          />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
    </Box>
  );
};

export default Body;
