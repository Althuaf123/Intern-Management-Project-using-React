import React, { useState,useEffect, useRef } from "react";
import axios from "../../axios";
import { Box, TextField, Button, Paper, Typography, } from "@mui/material";
import { wsUrl } from "../../constants/baseUrl";

const Chat = ( {details} ) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [id, setId] = useState(null)
  const [roomName, setRoomName] = useState('');
  const [socket, setSocket] = useState(null)
  const [socketOpen, setSocketOpen] = useState('')
  const messageRef = useRef(null)
  const user_id = details.user.id
  const admin_id = details.batch_id.user_id


  const fetchMessages = async (room_name) => {
    const response = await axios.get(`/chat/room_name=${roomName}`)
    // const { success, messages: message } = response.data
    if (response.status === 200) {
      setMessages(response.data.messages)
      console.log(messages)

    } else {
      console.log("Error: ", response.data.message)
    }
  }


  useEffect(() => {
    const room_name = `${admin_id}_${user_id}`
    const new_socket = new WebSocket(`${wsUrl}/ws/chat/${room_name}/`);
    setRoomName(room_name);

    new_socket.onopen = () => {
      setSocketOpen(true)
      fetchMessages(room_name)
    }


    new_socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setMessages((prevMessages) => [...prevMessages,data.message])
    }

    new_socket.onclose = () => {
      setSocket(false)
    }

    setSocket(new_socket)
    return () => new_socket.close();
  },[id])

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages])

  const handleNewMessage = (event) => {
    setNewMessage(event.target.value)
  }

  const sendMessage = (senderId) => {
    const messageObject = {
      sender_id : senderId,
      message: newMessage,
      room_name: roomName
    }
    socket.send(JSON.stringify(messageObject));
   setNewMessage('') 

  }


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
        height: "90vh",
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
            
            <Paper
              key={index}
              sx={{
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "#F5F5FA",
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
