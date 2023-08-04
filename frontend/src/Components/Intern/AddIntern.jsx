import * as React from 'react';
import axios from '../../axios'

import { Box, TextField, Button, Checkbox, FormControlLabel, Grid, Container, Typography, Select, MenuItem, InputLabel, FormControl, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert'


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})
 
function AddIntern () {

  const [ batchList, setBatchList ] = React.useState('')
  const [ snackbarOpen, setSnackbarOpen ] = React.useState(false)
  const[ snackbarSeverity, setSnackbarSeverity ] = React.useState('error')
  const [ snackbarMessage, setSnackbarMessage ] = React.useState('')


  React.useEffect(() => {
    axios.get('api/view/batch-list')
    .then((response) => {
        setBatchList(response.data)
        console.log(response.data)
    }).catch((error) => console.log(error) )
  }, [])

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        batch_id: '',
        roles: {
          is_cc: false,
          is_mentor: false,
          is_sc: false,
        },
      });
    
      const [formErrors, setFormErrors] = React.useState({
        name: '',
        email: '',
        batch_id: '',
        roles: '',
      });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      };

      const handleBatchChange = (event) => {
        console.log(event.target)
        setFormData((prevData) => ({ ...prevData, batch_id: event.target.value }))
        setFormErrors((prevErrors) => ({ ...prevErrors, batch_id: ''}))
      }
    
      const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFormData((prevData) => ({ ...prevData, roles: { ...prevData.roles, [name]: checked } }));
        setFormErrors((prevErrors) => ({ ...prevErrors, roles: '' }));
      };

      const handleCloseSnackbar = () => {
        setSnackbarOpen(false)
      }

      const isValidEmail = (email) => {

        const emailRegex = /^[^\s@]+@[^\s@]+$/
        return emailRegex.test(email)
  
      }

      const validateData = (e) => {

        let errors = {};
        if (!formData.name) {
          errors.name = 'Name is required';
        }
        if (!formData.email) {
          errors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            errors.email = 'Enter valid Email'
        }
        if (!formData.batch_id) {
          errors.batch_id = 'Batch is required';
        }
        if (!formData.roles.is_cc && !formData.roles.is_mentor && !formData.roles.is_sc) {
          errors.roles = 'Select at least one role';
        }
    
        if (Object.keys(errors).length > 0) {
          setFormErrors(errors);
          return false;
        } else {
          setFormErrors({})
          return true
        }

      }
    
      const handleSubmit = (event) => {

        event.preventDefault()

        const isValid = validateData()

        if (isValid) {
          try {
          axios.post('/api/add/intern/',{

            name: formData.name,
            email: formData.email,
            batch_id: formData.batch_id,
            is_cc: formData.roles.is_cc,
            is_mentor: formData.roles.is_mentor,
            is_sc: formData.roles.is_sc,
  
          })
          .then((response) => {

            setSnackbarSeverity('success')
            setSnackbarMessage('New intern added')
            setSnackbarOpen(true)

          })
          .catch((error) => {

            setSnackbarSeverity('error')

            if (error.response && error.response.data && error.response.message) {
              setSnackbarMessage(error.response.data.message)
            } else {
              setSnackbarMessage('Intern already exists')
            }
            
            setSnackbarOpen(true)

          })

        } catch (error) {

          setSnackbarSeverity('error')
          setSnackbarMessage('Invalid credentials/intern already exists')
          setSnackbarOpen(true) 
        
        }

        }

      };

    return(
        <Box
            sx={{
                backgroundColor : '#5584B0',
                minHeight: '100vh', 
                display:'flex', 
                justifyContent:'center',
                alignItems:'center',
                paddingTop:'75px'
            }}
        >
    <Container component="main" maxWidth="sm" sx={{ backgroundColor: '#CBE3EF', borderRadius: '10px', minHeight:'500px', boxShadow:'0px 3px 6px rgba(0,0,0,1)'  }}>
      <Typography variant="h5" sx={{marginTop:'10px'}}>Add Intern</Typography><br/>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
          </Grid>
          <Grid item xs={12}>
          <FormControl fullWidth >
          <InputLabel>Batch</InputLabel>
            <Select
              label="Batch"
              name="batch"
              value={formData.batch_id}
              onChange={handleBatchChange}
              error={!!formErrors.batch_id}
              // helperText={formErrors.batch_id}
              sx={{textAlign:'left'}}
            >
              {batchList && batchList.map((batch) => (
                <MenuItem 
                key={batch?.id} 
                value={batch?.id}
                disabled={!batch.is_active}
                >
                  {batch?.batch_num}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{textAlign:'left'}}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.roles.is_cc}
                  onChange={handleCheckboxChange}
                  name="is_cc"
                />
              }
              label="Communication coordinator"
            /><br/>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.roles.is_mentor}
                  onChange={handleCheckboxChange}
                  name="is_mentor"
                />
              }
              label="Mentor"
            /><br/>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.roles.is_sc}
                  onChange={handleCheckboxChange}
                  name="is_sc"
                />
              }
              label="Senior Coordinator"
            /><br/>
            {formErrors.roles && (
              <Typography color="error" variant="caption">
                {formErrors.roles}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} marginBottom={'10px'} >
            <Button type="submit" variant="contained" sx={{backgroundColor:'#81C2E6', color:'#1F1F29', '&:hover' : {backgroundColor:'#81C2E6'}}}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={ snackbarOpen } autoHideDuration={5000} onClose={ handleCloseSnackbar } >

        <Alert onClose={ handleCloseSnackbar } severity={ snackbarSeverity } >
          { snackbarMessage }
        </Alert>
      </Snackbar>
    </Container>
    </Box>
    )
}

export default  AddIntern