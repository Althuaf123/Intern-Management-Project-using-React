import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import ProfileSection from "./ProfileSection";
import TaskSection from "./TaskSection";
import { useLocation } from 'react-router-dom';

const InternDetailsView = ( intern_id ) => {
  const [details, setDetails] = useState([]);
  const [selectedOption, setSelectedOption] = useState("profile");
  const location = useLocation()

  useEffect(() => {
    
    const intern_id = new URLSearchParams(location.search).get("intern_id");

    axios
      .get(`/api/view/intern-details/${intern_id}`)
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
