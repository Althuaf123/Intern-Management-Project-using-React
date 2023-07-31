import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Reducers/LoginReducer';
import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem,} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../Sidebar/Sidebar';

function Navbar() {
  const [name, setName] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const open = Boolean(anchorEl)

useEffect (() => {
  const Name = localStorage.getItem('name')
  setName(Name || 'Administrator')
})

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSidebarToggle = () => {
    setOpenDrawer(!openDrawer);
  };


  const handleProfile = () => {
    navigate('/profile-page')
  }


  const handleLogout = () => {
    setAnchorEl(null)
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
        dispatch(logout())
        navigate('/login')
    }
}


  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar sx={{ backgroundColor : '#FAFAF5' }}  position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleSidebarToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color : '#1F1F29' }} textAlign={'left'}>
            MEG
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color : '#1F1F29' }} textAlign={'right'}>
             { name }
          </Typography>
          
          <div>
            <IconButton
            id = "basic-button"
            aria-controls = { open ? 'basic-menu' : undefined }
            aria-expanded = { open ? 'true' : undefined }
            onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu 
            id = "basic-menu"
            anchorEl={ anchorEl }
            open = { open }
            onClose={ handleClose }
            MenuListProps={{ 
              'aria-labelledby':'basic-button' 
            }}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>

            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Sidebar open={openDrawer} onClose={() => setOpenDrawer(false)} />
    </Box>
  );
}

export default Navbar;
