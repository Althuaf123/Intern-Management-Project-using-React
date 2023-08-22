import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import ProfileSection from "./ProfileSection";
import TaskSection from "./TaskSection";

const InternDetailsView = ( {intern_id} ) => {
  const [details, setDetails] = useState([]);
  const [selectedOption, setSelectedOption] = useState("profile");

  useEffect(() => {
    // const id = localStorage.getItem('id')
    const id = 5
    // console.log(props)
    console.log(intern_id)
    axios
      .get(`/api/view/intern-details/${id}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };


  return (
    <Box
      sx={{
        backgroundColor: "#5584B0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column", 
        alignItems: "center",
        paddingTop: "75px",
        
      }}
    >
      <Box>
        <Button
          variant={selectedOption === "profile" ? "contained" : "outlined"}
          onClick={() => handleOptionChange("profile")}
          style={{ marginRight: "10px", color:'#ffff' }}
        >
          Profile
        </Button>
        <Button
          variant={selectedOption === "task" ? "contained" : "outlined"}
          onClick={() => handleOptionChange("task")}
          style={{ color:'#ffff' }}
        >
          Task
        </Button>
      </Box>
      {selectedOption === "profile" && <ProfileSection details={details} />}
      {selectedOption === "task" && <TaskSection details={details} />}
    </Box>
  );
};

export default InternDetailsView;
