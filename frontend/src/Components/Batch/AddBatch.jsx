import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from '../../axios'

function AddBatch( { setOpenDialog, onBatchAdded } ) {

    const [administratorId, setAdministratorId] = React.useState('')
    const [formData, setFormData] = React.useState({
      batchName:'',
      batchSize:''
    })

    const [formErrors, setFormErrors] = React.useState({
      batchName:'',
      batchSize:''
    })

  
    useEffect(() => {
      setAdministratorId(localStorage.getItem('id'))
    }, []);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  }


  const validateData = (e) => {
    let errors = {}

    if (!formData.batchName) {
      errors.batchName = 'Field caannot be empty'
    }

    if (!formData.batchSize) {
      errors.batchSize = 'Field cannot be empty'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    } else {
      setFormErrors({})
      return true
    }
  }
  const handleSubmit = async (event) => {

    event.preventDefault()

    const isValid = validateData()

    if (isValid) {
        
        try{
            const response = await axios.post('api/add/batch/', {
                batch_num: formData.batchName,
                batch_size: formData.batchSize,
                user_id: administratorId,
            })

            if(response.status === 201) {
                setOpenDialog(false)
                onBatchAdded()
                console.log('Saved!!')
            }
        } catch (error) {
            if (error.reponse) {
                setFormErrors(error.response.data)
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
            name='batchName'
            label="Batch Name"
            type="text"
            fullWidth
            variant="standard"
            value={formData.batchName}
            onChange={handleInputChange}
            error={!!formErrors}
            helperText={formErrors.batchName}
            
          />
          <TextField
            margin="dense"
            id="name"
            name='batchSize'
            label="Batch Size"
            type="number"
            fullWidth
            variant="standard"
            value={formData.batchSize}
            onChange={handleInputChange}
            error={!!formErrors}
            helperText={formErrors.batchSize}
            
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