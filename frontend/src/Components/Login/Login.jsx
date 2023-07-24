import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, TextField, Button, Container, Box  } from '@mui/material'
import Link from "@mui/material/Link";
// import axios from "../../axios";
import { loginUser } from "../../Reducers/LoginReducer";



const initialError = {
  email : false,
  password : false
}
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState({
      email: '',
      password: ''
    })

    const [dataErrors, setDataErrors] = useState(initialError)

    const { loading, success, error } = useSelector((state) => state.login);

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    if (success) {
      navigate("/homepage");
    }
  }, [success]);
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
    // const [email,setEmail] = useState('')
    // const [password,setPassword] = useState('')

    // const handleSubmit = async (e) => {
    //   e.preventDefault()

    //   try {
    //     await axios.post('api/login/', {
    //       email: email,
    //       password: password,
    //     });
    //     navigate('/');
    //   } catch (error) { console.log(error);}
      

    // }

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
        </Box>
    )
}

export default Login