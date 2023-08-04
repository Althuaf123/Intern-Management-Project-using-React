import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from '../../axios'

function AddBatch( { setOpenDialog, onBatchAdded } ) {

    const [batchName, setBatchName] = React.useState('')
    const [dataErrors, setDataErrors] = React.useState('')
    const [administratorId, setAdministratorId] = React.useState('')

  
    useEffect(() => {
      setAdministratorId(localStorage.getItem('id'))
    }, []);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    setBatchName(event.target.value)
    setDataErrors('')
  }

  const handleSubmit = async () => {
      if (!batchName) {
        setDataErrors('Field cannot be empty!')
      }else{
        
        try{
            const response = await axios.post('api/add/batch/', {
                batch_num: batchName,
                user_id: administratorId,
            })

            if(response.status === 201) {
                setOpenDialog(false)
                onBatchAdded()
                console.log('Saved!!')
            }
        } catch (error) {
            if (error.reponse) {
                setDataErrors(error.response.data)
            } else {
                console.error(error)
            }
        }

        }
  }
  return (
    <div>
     
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Add New Batch</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Batch Name"
            type="text"
            fullWidth
            variant="standard"
            value={batchName}
            onChange={handleInputChange}
            error={!!dataErrors}
            helperText={dataErrors}
            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
     
    </div>
  );
}

export default AddBatch