import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, TextField, Button, Container, Box  } from '@mui/material'
// import Link from "@mui/material/Link";
import axios from "../../axios";
// import { loginUser } from "../../Reducers/LoginReducer";



const initialError = {
  email : false,
  password : false
}
const SetPassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState('')
    const { uid,token } = useParams();


    const [dataErrors, setDataErrors] = useState(initialError)

    const { loading, success, error } = useSelector((state) => state.login);

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success]);


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/set_password/',{
        uid:uid,
        token:token,
        password:user.password
    })
    
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
              Set Password
            </Typography>
              {/* <TextField
                type="email"
                name="email"
                label="E-mail"
                autoComplete="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={user.password}
                onChange={ handleChange}
                error={dataErrors.email}
                helperText={dataErrors.email && "Enter your Password"}
                InputLabelProps={{
                  ...(user.password ? {shrink: true} : { shrink : false})
                }}
                // value={email}
                // onChange={ handleChange }
                // error = {dataErrors.email}
                // helperText={dataErrors.email && "Enter your Email"}
              /> */}
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
                InputLabelProps={{
                  ...(user.password ? {shrink: true} : { shrink : false})
                }}
                
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Done
              </Button>
                
          </Grid>
          </Box>
      </Container>
    </Grid>
        </Box>
    )
}

export default SetPassword