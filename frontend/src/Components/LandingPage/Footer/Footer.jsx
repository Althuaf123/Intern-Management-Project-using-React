import React, { useState } from 'react';
import { Grid, Typography, Modal, Box, Button } from '@mui/material';

function Footer() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleOpenModal = (category, subcategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const categories = [
    {
      name: 'Products',
      subcategories: ['Operations', 'Task Management', 'Documents'],
    },
    {
      name: 'Company',
      subcategories: ['Contact Us', 'About Us', 'Careers'],
    },
    {
      name: 'Resources',
      subcategories: ['Blog', 'Help Center', 'WhatsApp vs MEG'],
    },
  ];

  const getModalText = (subcategory) => {
    switch (subcategory) {
      case 'Operations':
        return 'You can manage your interns here.';
      case 'Task Management':
        return 'Assign, Monitor, and Evaluate the tasks.';
      case 'Documents':
        return 'We are working on it!';
      case 'Contact Us':
        return 'We are working on it!';
      case 'About Us':
        return 'We help your company to manage your interns. You can customise your website!';
      case 'Careers':
        return 'We are currently hiring Python Django + React developers. Send your resume to work with us.';
      case 'Blog':
        return 'Coming Soon!';
      case 'Help Center':
        return 'Coming Soon';
      case 'WhatsApp vs MEG':
        return 'Try it for free and find it by yourself';
      default:
        return '';
    }
  }

  return (
    <footer>
      
        <Grid container spacing={2} 
        sx={{marginTop : '1px', backgroundColor : '#2F4550', height : '15rem'}}
        >
            
          {categories.map((category) => (
            <Grid key={category.name}
             item xs={12} sm={4}
             sx={{ color : '#F9F4F4'}}
            >
              <Typography variant="h5" gutterBottom>
                {category.name}
              </Typography>
              <Grid container direction={'column'} sx={{ marginTop : '5%'}}>
              {category.subcategories.map((subcategory) => (
                <Button
                  key={subcategory}
                  variant="text"
                  onClick={() => handleOpenModal(category.name, subcategory)}
                  sx={{ textTransform: 'none', color : '#F9F4F4', marginBottom : '2%' , '&:hover' : {backgroundColor : '#B8DBD9', color  : '#0D134C'} }}
                >
                  {subcategory}
                </Button>
              ))}
            </Grid>
            </Grid>
          ))}
        </Grid>
      
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">
            {selectedCategory} - {selectedSubcategory}
          </Typography>
          <Typography variant="body1">{getModalText(selectedSubcategory)}</Typography>
        </Box>
      </Modal>
    </footer>
  );
}

export default Footer;
