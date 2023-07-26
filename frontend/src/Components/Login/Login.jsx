import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, TextField, Button, Container, Box, Snackbar } from '@mui/material'
import Link from "@mui/material/Link";
import MuiAlert from '@mui/material/Alert';

// import axios from "../../axios";
import { loginUser } from "../../Reducers/LoginReducer";



const initialError = {
  email : false,
  password : false
}
const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [snackbar, setSnackbar] = useState(false)
    const [user, setUser] = useState({
      email: 'kiran@gmail.com',
      password: 'althuaf@123'
    })

    const [dataErrors, setDataErrors] = useState(initialError)

    const { loading, success, error } = useSelector((state) => state.login);

  useEffect(() => {
    if (location.state && location.state.setPassword){
      setSnackbar(true)
    }
    console.log(error);
  }, [error]);

  useEffect(() => {
    if (success) {
      navigate("/homepage");
    }
  }, [success]);

  const handleSnackbarClose = () => {
    setSnackbar(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDataErrors={
      email:user.email==="",
      password:user.password===""
    }
    setDataErrors(newDataErrors)
    const hasError = Object.values(newDataErrors).some((error)=>error)
    if (!hasError){
      dispatch(loginUser(user))
      setDataErrors({
        email:'',
        password:''
      })

    }
  };


  const handleChange = (event) => {
    const {name}=event.target
    setUser({ ...user, [event.target.name]: event.target.value });
    setDataErrors((prevError) => ({
      ...prevError,
      [name]: false,
    }));
  };



    return (
        <Box sx={{ border: '1px red solid', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor: '#E0DDCA' }}>
        <Grid
        style={{
        backgroundColor: '#F5F5FA',
        height: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20px'
      }} 
       justifyContent={"center"} alignItems={"center"}> 
        
      <Container maxWidth="xs">
      <Box 
      component="form"
      noValidate
      onSubmit={handleSubmit}
      >
          <Grid item xs={12} sm={6}>
            <Typography variant="h1" align="center" gutterBottom
            sx={{font : 'revert'}}>
              Login
            </Typography>
              <TextField
                type="email"
                name="email"
                label="E-mail"
                autoComplete="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={user.email}
                onChange={ handleChange }
                error = {dataErrors.email}
                helperText={dataErrors.email && "Enter your Email"}
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={user.password}
                onChange={ handleChange}
                error={dataErrors.email}
                helperText={dataErrors.email && "Enter your Password"}
                // InputLabelProps={{
                //   ...(password ? {shrink: true} : { shrink : false})
                // }}
                
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Login
              </Button>
                
          </Grid>
          </Box>
            <Link onClick={()=>navigate('/signup')}
             variant="body2"
             sx={{cursor : 'pointer'}}
            >
              Don't have an account? Sign up
            </Link>
      </Container>
    </Grid>
    <Snackbar open={snackbar}  autoHideDuration={5000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
         Password set Successfully!
        </MuiAlert>
    </Snackbar>
        </Box>
    )
}

export default Login