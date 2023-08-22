import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Body = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState([]);
  const [id, setId] = useState("");
  const [selectedOption, setSelectedOption] = useState("new");
  const [refreshTasks, setRefreshTasks] = useState(false);
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
              onClick={() => handleStatusChange(task.id, 'Completed')}
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
    </Box>
  );
};

export default Body;
