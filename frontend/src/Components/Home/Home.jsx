import * as React from "react";
import  { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "../../axios";
import Profile from '../../Images/Profile.jpg';
import { Box, Avatar, Button, TextField, Typography, Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from "react-router-dom";


const Home = () => {

  const [details, setDetails] = useState([]);
  const [search, setSearch] = useState([]);
  const [id, setId] = useState('')
  const navigate = useNavigate();
  
  useEffect(() => {
    setId(localStorage.getItem('id'))
    axios
      .get("/api/view/intern")
      .then((response) => {
        setDetails(response.data);
        console.log(response);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure to do this. press confirm to delete"
    );

    if (confirmed) {
      axios
        .post(`api/users/delete/${id}`)
        .then(() => {
          const newData = details.filter((user) => {
            return user.id !== id;
          });
          setDetails(newData);
        })
        .catch(() => {
          alert("Something went wrong");
        });
    }
  };

  const searchHandler = (e) => {
    // const data = {search};

    axios
      .get(`api/interns/search/?query=${search}`)
      .then((response) => {
        setDetails(response.data)
        console.log(response.data)
      })
      .catch((error) => console.log(error));
  };
 

  return (
    <Box  
        sx={{
            backgroundColor : '#5584B0',
            minHeight: '100vh', 
            display:'flex', 
            justifyContent:'center',
            alignItems:'center',
            flexWrap:'wrap',
            gap:'20px',
            paddingTop:'75px'
        }} 
    >
         
    <Grid container rowSpacing={3} columnSpacing={5} sx={{mr:8,ml:12 ,mt:2,mb:4}}>
        {details.map((intern) => (

      <Grid key={intern.id} item xs={12} sm={6} md={3}>

        <Card  >
            <CardMedia
                component="img"
                alt="profile-pic"
                height="200"
                image={Profile}
            />
          <CardContent>
            <Typography textAlign='center' gutterBottom variant="h5" component="div">
                {intern.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View</Button>
            <Button size="small">Message</Button>
          </CardActions>
        </Card>
      </Grid>

              ))}
    </Grid>


   </Box>
  
  );
};

export default Home;
