import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import AddTaskModal from "./TaskCreation";
import axios from "../../axios";

const TaskSection = ({ details }) => {

  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [ tasks, setTasks ] = useState([])
  const id = details.id;
  const [selectedTask, setSelectedTask] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isTaskAdded, setIsTaskAdded] = useState(false);
  const [openTaskDetailsPopup, setOpenTaskDetailsPopup] = useState(false);


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpenTaskDetailsPopup = (task) => {
    setSelectedTask(task);
    setOpenTaskDetailsPopup(true);
  };
  
  const handleCloseTaskDetailsPopup = () => {
    setOpenTaskDetailsPopup(false);
  };
  


  useEffect(() => {
    axios
      .get(`/api/view/tasks/${id}`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.error(error));
  }, [isTaskAdded]);

  

  const handleOpenAddTaskModal = () => {
    setIsTaskAdded(false)
    setOpenAddTaskModal(true);
  };

  const handleCloseAddTaskModal = () => {
    setOpenAddTaskModal(false);
  };

  const handleTaskAdded = () => {
    setIsTaskAdded(true)
    setSnackbarOpen(true)
  }

  return (
    <Box>
      <Button 
        sx={{
              display: 'flex',
              justifyContent:'center',
              width: '100px',
              marginTop:'5rem',
              backgroundColor : '#81C2E6',
              color:'black',
              '&:hover':{ boxShadow : '03px 03px 6px rgba(0, 0, 0, 0.6)', backgroundColor: '#81C2E6' }
              }}
              onClick={handleOpenAddTaskModal}
      >
              New Task
            </Button><br />
      {tasks && tasks.length > 0 ? (
      <TableContainer component={Paper} style = {{ minWidth: '400px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style= {{ backgroundColor:'#1F1F29' ,color: 'white'}} >Task Name</TableCell>
              <TableCell  style= {{ backgroundColor:'#1F1F29' ,color: 'white'}} >Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={task.id} style={{ cursor: "pointer" }} onClick={ () => handleOpenTaskDetailsPopup(task) }>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      ) : (
        <p>No tasks assigned.</p>
      )}
      <Dialog open={openTaskDetailsPopup} onClose={handleCloseTaskDetailsPopup}>
      <Box
      sx={{ width: "400px", minWidth: "400px" }}>
  <DialogTitle>Task Details</DialogTitle>
  <DialogContent>
    {selectedTask && (
      <div>
      <Typography variant="body1" sx={{ color: 'purple' }}>Title:</Typography> {selectedTask.title}<br />
      <br /><Typography variant="body1" sx={{ color: 'purple' }}>Description:</Typography> {selectedTask.description}<br />
      <br /><Typography variant="body1" sx={{ color: 'purple' }}>Status:</Typography> {selectedTask.status}<br />
      <br /><Typography variant="body1" sx={{ color: 'purple' }}>Remarks:</Typography> {selectedTask.remarks}
    </div>
    
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseTaskDetailsPopup}>Close</Button>
  </DialogActions>
  </Box>
</Dialog>


      <AddTaskModal open={openAddTaskModal} onClose={handleCloseAddTaskModal}  onTaskAdded = {handleTaskAdded}  id={id} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Task added successfully!"
      />
    </Box>
  );
};

export default TaskSection;
