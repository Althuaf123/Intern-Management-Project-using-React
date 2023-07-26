import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, TextField, Button, Container, Box  } from '@mui/material'
import axios from "../../axios";




const initialError = {
  password : false
}

const SetPassword = () => {
    const navigate = useNavigate()
    const { uid,token } = useParams();

    const [user, setUser] = useState({
        password : '',
        re_password :''
    })

    const [dataErrors, setDataErrors] = useState(initialError)

    const { loading, success, error } = useSelector((state) => state.login);

  useEffect(() => {
    console.log(error);
  }, [error]);

//   useEffect(() => {
//     if (success) {
//       navigate("/login");
//     }
//   }, [success]);

  const validateData = (e) => {

    const errors = {}
    if(!user.password){
        errors.password = 'Password required'
    } else if (user.password.length < 8) {
        errors.password = 'password msut be 8 characters long'
    }

    if (!user.re_password) {
        errors.re_password = 'Confirm password to proceed'
    } else if (user.password !== user.re_password) {
        errors.re_password = 'Password does not match'
    }

    if (Object.keys(errors).length > 0) {
        setDataErrors(errors)
        return
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    validateData()

  
        try{
        axios.post('/api/set_password/',{
            uid:uid,
            token:token,
            password:user.password
        }).then((res) => {
            if(res.status===201) {
                navigate('/login', { state: {setPassword : true} })
            } 

        }).catch((error) => {
            if (error.response.status === 400) {
                console.log("Error 400")
            }
        })


        } catch (error) {console.log(error)}

     

  };


  const handleChange = (event) => {
    const { name } = event.target
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
              <TextField
                required
                fullWidth
                type="password"
                name="password"
                label="Password"
                variant="outlined"  
                margin="normal"
                value={user.password}
                onChange={ handleChange}
                error={!!dataErrors.password}
                helperText={dataErrors.password}   
              />
              <TextField 
              required
              fullWidth
              type="password"
              name="re_password"
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              value={user.re_password}
              onChange={ handleChange }
              error={!!dataErrors.re_password}
              helperText={dataErrors.re_password}
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