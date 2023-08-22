import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "../../axios";

const AddTaskModal = ({ open, onClose, onTaskAdded,id }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
 
  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };


  const handleSubmit = async () => {
    // const id = 4
    try {
      await axios.post('api/add/tasks/', {
        intern : id,
        title: taskTitle,
        description: taskDescription,
      });
      onTaskAdded()
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="taskTitle"
          label="Task Title"
          type="text"
          fullWidth
          value={taskTitle}
          onChange={handleTaskTitleChange}
          inputProps={{ maxLength: 50 }}
        />
        <TextField
          margin="dense"
          id="taskDescription"
          label="Task Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={taskDescription}
          onChange={handleTaskDescriptionChange}
          inputProps={{ maxLength: 500 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>

    
  );
};

export default AddTaskModal;
