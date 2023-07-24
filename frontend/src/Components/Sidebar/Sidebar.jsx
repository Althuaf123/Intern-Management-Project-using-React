import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Reducers/LoginReducer';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeWorkTwoToneIcon from '@mui/icons-material/HomeWorkTwoTone';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';


function Sidebar({ open, onClose }) {

    const dispatch = useDispatch()
    const navigate = useNavigate

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure?");
        if (confirmed) {
            dispatch(logout())
            navigate('/login')
        }
    }


    const listItemData = [ 
        
        { icon: <HomeWorkTwoToneIcon />, text: 'Home' },
        { icon: <PersonAddAltTwoToneIcon />, text: 'Add Intern' },
        { icon: <InboxIcon/>, text: 'Interns' },
        { icon: <MailIcon />, text: 'Coordinators' },
        { icon: <InboxIcon />, text: 'Senior Coordinators' },
        { icon: <MailIcon />, text: 'Mentors' },
       
    ]
  const list = (
    <div
      sx={{ width: 250 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <List>
        {listItemData.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                {<LogoutTwoToneIcon />}
              </ListItemIcon>
              <ListItemText primary = 'Logout' />
            </ListItemButton>
          </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
    >
      {list}
    </Drawer>
  );
}

export default Sidebar;
