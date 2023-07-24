import React, {useState} from "react";
import  LandingPagea from '../../Images/LandingPagea.jpg'
import { Grid, Typography, TextField, Button, Container, Box  } from '@mui/material'
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import axios from '../../axios'


const Signup = () => {
    const navigate = useNavigate()

    const[data, setData] = useState({
      name: '',
      email: '',
      company: '',
      password: '',
      re_password: '',

    })

    const [dataErrors, setDataErrors] = useState({})

    const handleChange = (e) => {
      const { name, value } = e.target
      setData((prevData) => ({
        ...prevData,
        [name]: value
      }))
    }

    const validateData = (e) => {
      
      const errors = {}
      if (!data.name.trim()) {
        errors.name = 'Name is required'
      }
      
      if (!data.email.trim()) {
        errors.email = 'Email is required'
      } else if (!isValidEmail(data.email)) {
        errors.email = 'Invalid Email'
      }

      if (!data.company.trim()) {
        errors.company = 'Company Name required'
      }

      if (!data.password.trim()) {
        errors.password = 'Password required'
      } else if (data.password.trim().length < 8) { 
        errors.password = 'Password must be 8 characters long'
      }

      if (!data.re_password.trim()) {
        errors.re_password = 'Confirm Password'
      } else if (data.password !== data.re_password) {
        errors.re_password = 'Password do not match'
      }

      if (Object.keys(errors).length > 0) {
        setDataErrors(errors)
        return;
      }

    }

    const isValidEmail = (email) => {

      const emailRegex = /^[^\s@]+@[^\s@]+$/
      return emailRegex.test(email)

    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();

      validateData();
    
      try {
        await axios.post('api/signup/', {
          name: data.name,
          company: data.company,
          email: data.email,
          password: data.password,
        }).then((res)=>{
          if(res.status===201){
            console.log("response as 201");
            navigate('/login');
          }
        }).catch((error)=>{
  if(error.response.status===400)
  {
    console.log("400 error");
  }
        })
       
      } catch (error) { console.log(error);}
    };

    return ( 
        <Box sx={{ border: '1px red solid', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor: '#E0DDCA' }}>
        <Grid item xs={12} sm={12} lg={8}
        style={{
        backgroundColor: '#F5F5FA',
       
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20px'
      }} 
      spacing={2} justifyContent={"center"} alignItems={"center"}> 
        
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <img
              src={LandingPagea}
              alt="img"
              style={{ width: '100%', height: '100%' ,  objectFit: 'cover', borderRadius : '10px' }}
            />
          </Grid>
         
          <Grid
           item xs={12} sm={6}
          >
            <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}

            >
            <Typography variant="h4" align="center" gutterBottom>
              Signup
            </Typography>
              <TextField
                required
                fullWidth
                name="name"
                label="Full Name"
                variant="outlined" 
                margin="normal"
                value={data.name}
                onChange={handleChange}
                error={!!dataErrors.name}
                helperText={dataErrors.name}
        
              />
              <TextField
                required
                fullWidth
                name="email"
                label="E-mail"
                type="email"
                variant="outlined"
                margin="normal"
                value={data.email}
                onChange={ handleChange }
                error={!!dataErrors.email}
                helperText={dataErrors.email}
              
              />
              <TextField
                required
                fullWidth
                name="company"
                label="Company Name"
                variant="outlined"
                margin="normal"
                value={data.company}
                onChange={handleChange}
                error={!!dataErrors.company}
                helperText={dataErrors.company}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={data.password}
                onChange={ handleChange}
                error={!!dataErrors.password}
                helperText={dataErrors.password}
              />
              <TextField
                required
                fullWidth
                name="re_password"
                label="Re-enter Password"
                variant="outlined"
                type="password"
                margin="normal"
                value={data.re_password}
                onChange={handleChange}
                error={!!dataErrors.re_password}
                helperText={dataErrors.re_password}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Signup
              </Button><br/>
              <Link onClick={()=>navigate('/login')}
                variant="body2"
                sx={{cursor : 'pointer'}}
                >
                Already have an account? Sign in
              </Link>
              </Box>
          </Grid>
          
        </Grid>
      </Container>
    </Grid>
        </Box>
    )
}
export default Signup
