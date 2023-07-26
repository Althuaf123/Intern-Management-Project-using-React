import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Reducers/LoginReducer';
import AddBatch from '../Batch/AddBatch'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box } from '@mui/material';

import HomeWorkTwoToneIcon from '@mui/icons-material/HomeWorkTwoTone';
import Man3TwoToneIcon from '@mui/icons-material/Man3TwoTone';
import ManTwoToneIcon from '@mui/icons-material/ManTwoTone';
import Man4TwoToneIcon from '@mui/icons-material/Man4TwoTone';
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import AddToPhotosTwoToneIcon from '@mui/icons-material/AddToPhotosTwoTone';
import FilterNoneTwoToneIcon from '@mui/icons-material/FilterNoneTwoTone';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';


function Sidebar({ open, onClose }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ openDialog, setOpenDialog] = useState(false)


    const handleHome = () => {
        navigate('/')
    }

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure?");
        if (confirmed) {
            dispatch(logout())
            navigate('/login')
        }
    }

    const handleAddIntern = () => {
        navigate('/add-intern')
    }

    const handleAddBatch = () => {
        console.log('Added')
        setOpenDialog(true)
    }

    const handleBatch = () => {
        navigate('/batch-list')
        console.log('batch page')
    }

    const listItemData = [ 
        
        { icon: <HomeWorkTwoToneIcon />, text: 'Home', onClickHandler: handleHome },
        { icon: <PersonAddAltTwoToneIcon />, text: 'Add Intern', onClickHandler: handleAddIntern },
        { icon: <AddToPhotosTwoToneIcon />, text: 'Add Batch', onClickHandler: handleAddBatch },
        { icon: <FilterNoneTwoToneIcon />, text: 'Batches', onClickHandler: handleBatch },
        { icon: <PeopleOutlineTwoToneIcon/>, text: 'Interns', onClickHandler: handleHome },
        { icon: <ManTwoToneIcon />, text: 'Mentors' },
        { icon: <Man3TwoToneIcon />, text: 'Coordinators' },
        { icon: <Man4TwoToneIcon />, text: 'Senior Coordinators' },
        
       
    ]
  const list = (
    <div
      sx={{ width: 250 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >

        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {<CloseTwoToneIcon />}
              </ListItemIcon>
              <ListItemText primary = 'Close' />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List>
        {listItemData.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={item.onClickHandler}>
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
    <Box>
    {openDialog && <AddBatch setOpenDialog={setOpenDialog} />}
    <Drawer anchor="left" open={open} onClose={onClose} >
      {list}
    </Drawer>
    </Box>
  );
}

export default Sidebar;
