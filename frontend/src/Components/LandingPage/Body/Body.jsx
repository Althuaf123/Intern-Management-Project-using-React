import React from "react";
import LandingPage from '../../../Images/LandingPage.jpg'
import { useNavigate } from 'react-router-dom'
import { Grid, Typography, Button, Paper } from '@mui/material';

function Body(){

    const navigate = useNavigate();
    const handleSignUp = () => {
        navigate('/signup')
    }
    return(
        <>
       <Grid 
       container spacing={2}
       alignItems={"center"}
       justifyContent={'center'}
       sx={{marginTop : '1px', backgroundColor : '#2F4550', minHeight : '8rem'}}
       > 
        <Grid item xs={12} sm={6}>
            <Typography 
            sx={{color : '#B8DBD9', fontFamily:' Georgia, serif'}} 
            variant="h4" 
            align="center"
            >
                The One Solution for Managing Your Interns.
            </Typography>
            <Typography 
            sx={{color : '#FCFFFD', fontFamily:' Georgia, serif',fontSize:'smaller'}} 
            variant="h6" 
            align="center"
            >
                Manage, train, and communicate with your interns all on MEG easy-to-use app.
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Button 
            variant="contained" 
            onClick={handleSignUp} 
            sx={{backgroundColor : '#B8DBD9','&:hover' : {backgroundColor : '#72a6a3'}, color : '#17171F', fontFamily : 'system-ui', borderRadius : '25px'}} 
            >
                    Get Started Now
            </Button>
        </Grid>
       </Grid>
      <Grid 
      container spacing={2} 
      alignItems="center" 
      sx={{ marginTop: '1px', backgroundColor : '#E6DB74' , minHeight:'25rem' }}
      >
        <Grid 
        item xs={12} 
        sm={6}
        lg={6}
        sx={{marginLeft : '5%'}}
        >
          <Paper 
          elevation={3} 
          sx={{ width : '250px', height : '250px', borderRadius : '50%', overflow : 'hidden', boxShadow : '0 2px 4px rgbaa(0,0,0,0.3'}} 
          >
          <img
          alt="img"
          src={LandingPage} 
          style={{ width :'100%', height : '100%' , objectFit : 'cover' }}/
          >
          </Paper>
        </Grid>   
        <Grid 
        item xs={12} 
        sm={4}
        >
          <Typography sx={{color  : '#0D134C'}}>
            A BIG deal for small businessess 
          </Typography>
          <Typography 
          variant="h4" 
          sx={{color  : '#0D134C'}} 
          >
            Create your team now!
          </Typography>
          <Typography 
          variant="h5" 
          sx={{marginBottom : '1%', color  : '#0D134C'}}
          >
            absolutely for FREE!
          </Typography>
          <Button 
          onClick={handleSignUp} 
          variant="contained" 
          sx={{color : '#202A4C', backgroundColor : '#F9F4f4', fontFamily : 'unset', borderRadius : '5px', '&:hover' : {backgroundColor : '#ffff'}}}
          >
          Create FREE account
          </Button>
        </Grid>
      </Grid>
      </>

    );
}  

export default Body