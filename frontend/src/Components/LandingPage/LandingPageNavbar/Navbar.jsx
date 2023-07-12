import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { FaUser } from "react-icons/fa";


function Navbar() {

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login')
  }
  return (
    <AppBar sx={{backgroundColor : '#F5F5FA'}} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#17171F',
              textDecoration: 'none',
            }}
          >
            MEG
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#17171F',
              textDecoration: 'none',
            }}
          >
            MEG
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}> 
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <FaUser/>  
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button
                onClick={handleLogin}
                sx={{ my: 2, color: 'inherit', backgroundColor : '#4D96F7','&:hover': {backgroundColor:'#4D96F7'}, display: 'block',borderRadius : '5px' }}
                color='primary'
              >
                Login
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    // </ThemeProvider>
  );
}
export default Navbar;