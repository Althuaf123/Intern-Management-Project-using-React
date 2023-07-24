// import React from "react";
// import { Box, Typography } from "@mui/material";


// function Home () {
//     return (
//         <Box sx={{ backgroundColor : '#5584B0',height: '100vh' }}>
//             <Typography sx={{marginTop : "55px", color:'#ffff'}}>Hello</Typography>
//         </Box>

        
//     )
// }

// export default Home


import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "../../axios";
import { Avatar, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";



const Home = () => {
  const [details, setDetails] = useState([]);
  const [search, setSearch] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
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
  const users = details.map((user) => (
    <tr key={user.id}>
      <td>
        <div className="d-flex align-items-center">
          <Avatar
            alt="User image"
            src={
              user.image ? `http://127.0.0.1:8000/api/users${user.image}` : null
            }
          />
          <div className="ms-3">
            <p className="fw-bold mb-1">{user.name}</p>
            <p className="text-muted mb-0">{user._id}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">{user.phonenumber}</p>
      </td>
      <td>{user.email}</td>
      <td>
        <Button
          variant="outlined"
          onClick={() => navigate(`/admin/edit/${user.id}`)}
        >
          Edit
        </Button>
      </td>
      <td>
        <Button
          sx={{ marginLeft: "0.5rem" }}
          color="error"
          variant="outlined"
          onClick={() => handleDelete(user.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <Box  sx={{ backgroundColor : '#5584B0',height: '100vh'}} >
    <div className="admin-home-page card">
      <div className="d-flex align-items-center justify-content-end">
      <div className="d-flex align-items-center justify-content-start mr-5">
        <Button
          variant="contained"
          sx={{ height: "3.5rem", marginLeft: "0",backgroundColor:"#131313",marginRight:"55vw" }}
          onClick={()=>navigate('/api/create_intern')}
        >
          Add User
        </Button>
      </div>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ height: "3.5rem", marginLeft: "0.5rem",backgroundColor:"#131313" }}
          onClick={searchHandler}
        >
          Search
        </Button>
      </div>
      <MDBTable align="middle" sx={{ height: "3.5rem", marginLeft: "0.5rem" }}>
        <MDBTableHead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Email</th>
            {/* <th scope="col">Position</th> */}
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>{users}</MDBTableBody>
      </MDBTable>
    </div>
   </Box>
  );
};

export default Home;
