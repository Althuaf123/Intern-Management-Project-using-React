import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Box, Button } from "@mui/material";
import ProfileSection from "./ProfileSection";
import TaskSection from "./TaskSection";
import { useLocation } from 'react-router-dom';
import Chat from "../Chat/Chat";

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
          style={{ marginRight: "10px", color:'#1F1F29', backgroundColor:'#C5DFF8' }}
        >
          Profile
        </Button>
        <Button
          variant={selectedOption === "task" ? "contained" : "outlined"}
          onClick={() => handleOptionChange("task")}
          style={{ marginRight: "10px", color:'#1F1F29', backgroundColor:'#C5DFF8' }}
        >
          Task
        </Button>
        <Button
          variant={selectedOption === "chat" ? "contained" : "outlined"}
          onClick={() => handleOptionChange("chat")}
          style={{ color:'#1F1F29', backgroundColor:'#C5DFF8' }}
        >
          Chat
        </Button>
      </Box>
      {selectedOption === "profile" && <ProfileSection details={details} />}
      {selectedOption === "task" && <TaskSection details={details} />}
      {selectedOption === 'chat' && <Chat details={details} />}
    </Box>
  );
};

export default InternDetailsView;
