import React, { useState } from "react";
import { Box, TextField, Button, Paper, Typography, } from "@mui/material";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor:'#5584B0'
      }}
    >
      <Paper sx={{ width: "400px", padding: "20px", backgroundColor: "#F5F5FA" }}>
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          Chat Room
        </Typography>
        <Box
          sx={{
            height: "400px",
            overflowY: "scroll",
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "20px",
            backgroundColor: "#E0DDCA"
          }}
        >
          {messages.map((message, index) => (
            // <div key={index}>{message.text}</div>
            
            <Paper
              key={index}
              sx={{
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "#F5F5FA", // Customize the message card background color
              }}
            >
                { message.text }
            </Paper>
          ))}
        </Box>
        <TextField
          label="Type a message"
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ width: "100%", marginBottom: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Paper>
    </Box>
  );
};

export default Chat;
