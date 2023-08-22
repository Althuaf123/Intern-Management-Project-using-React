import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Body = () => {
  const [details, setDetails] = useState([]);
  const [search, setSearch] = useState([]);
  const [id, setId] = useState("");
  const [selectedOption, setSelectedOption] = useState("new");
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  useEffect(() => {
    setId(localStorage.getItem("id"));
    axios
      .get("/api/view/intern")
      .then((response) => {
        setDetails(response.data);
        console.log(response);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const renderCardContents = () => {
    if (selectedOption === "new") {
      return (
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Option 1 Content
            </Typography>
          </CardContent>
        </Card>
      );
    } else if (selectedOption === "ongoing") {
      return (
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Option 2 Content
            </Typography>
          </CardContent>
        </Card>
      );
    } else if (selectedOption === "completed") {
      return (
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Option 3 Content
            </Typography>
          </CardContent>
        </Card>
      );
    }
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
      <Grid item xs={12} md={6} sx={{ marginBottom: "20px" }}>
        <Typography variant="h4" sx={{ color: "#CBE3EF" }}>
          Tasks
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: "50%", alignSelf: "center" }}>
        <Paper sx={{ padding: 2 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <button
              onClick={() => handleOptionChange("new")}
              style={{
                backgroundColor: "#5584B0",
                color: "#FFFFFF",
                padding: "10px 20px",
                borderRadius: "5px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                border: "none",
                cursor: "pointer",
              }}
            >
              New Task
            </button>
            <button
              onClick={() => handleOptionChange("ongoing")}
              style={{
                backgroundColor: "#5584B0",
                color: "#FFFFFF",
                padding: "10px 20px",
                borderRadius: "5px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Ongoing
            </button>

            <button
              onClick={() => handleOptionChange("completed")}
              style={{
                backgroundColor: "#5584B0",
                color: "#FFFFFF",
                padding: "10px 20px",
                borderRadius: "5px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Completed
            </button>
          </div>
          {renderCardContents()}
        </Paper>
      </Grid>
    </Box>
  );
};

export default Body;
