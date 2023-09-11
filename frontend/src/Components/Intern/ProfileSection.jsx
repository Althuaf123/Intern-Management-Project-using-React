import React from "react";
import { Box, Typography, Avatar, Grid, Paper } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BusinessIcon from "@mui/icons-material/Business";

const ProfileSection = ({ details }) => {
  const user = details.user;
  const batch = details.batch_id;


  return (
    <Box
      marginTop={10}
      minHeight="100vh"
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 600,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <Avatar
              alt={user?.name}
              src={user?.image}
              sx={{
                width: 200,
                height: 200,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              {user?.name}
            </Typography>
            <Typography color="textSecondary" variant="body1" gutterBottom>
              {user?.email}
            </Typography>
            {/* <Typography color="textSecondary" variant="body1" gutterBottom>
              <WorkOutlineIcon fontSize="small" /> {user?.role}
            </Typography> */}
            <Typography color="textSecondary" variant="body1">
              {batch?.batch_num}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfileSection;
