// BatchEditModal.js

import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function EditBatch({ open, onClose, batchName, onSubmit }) {
  const [newName, setNewName] = React.useState(batchName);

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(newName);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Batch</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Batch Name"
          type="text"
          fullWidth
          variant="standard"
          value={newName}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditBatch
