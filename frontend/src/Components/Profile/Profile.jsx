import * as React from "react";
import axios from "../../axios";
import { baseUrl } from "../../constants/baseUrl";

import {
  Avatar,
  Box,
  TextField,
  Button,
  Grid,
  Container,
  Typography,
} from "@mui/material";


const Profile = () => {
  const [image, setImage] = React.useState(null);
  const fileRef = React.useRef();

  const handleImageChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setImage(file);
    const name = e.target.files[0];
    console.log(file);
    console.log(file);
    if (file && name.type.startsWith("image/")) {
      setFormData({ ...formData, image: file });
    }
  };

  const [administratorId, setAdministratorId] = React.useState(
    localStorage.getItem("id")
  );

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    image: "",
  });

  React.useEffect(() => {

    axios
      .get(`api/view/profile-view/?id=${administratorId}`)
      .then((response) => {
        console.log(response.data);

        const { name, email, company, image } = response.data;

        setFormData({
          name: name,
          email: email,
        //   image: image,
        });
        
        setImage(`${baseUrl}${image}`)
        
      })
      .catch((error) => console.log(error));
  }, []);

  const [formErrors, setFormErrors] = React.useState({
    name: "",
    email: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateData = (e) => {
    let errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Enter valid Email";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    } else {
      setFormErrors({});
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fileRef.current.files);
    const file = fileRef.current.files[0];
    const _form = new FormData();
    _form.append("name", formData.name);
    if (fileRef.current.files.length > 0) {
      console.log("image appended");
      _form.append("image", file, file?.name);
    }
    axios.patch(`/api/edit/administrator/${administratorId}`, _form, {
      headers: {
        "Content-Type": "multipart/form-data",
        //   Authorization: `Bearer ${token}`
      },
    });

    //   const isValid = validateData()
  };

  return (
    <Box
      sx={{
        backgroundColor: "#5584B0",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    > <Typography variant="h5" sx={{ marginTop: "10px" }}></Typography>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          backgroundColor: "#CBE3EF",
          borderRadius: "10px",
          minHeight: "500px",
          boxShadow: "0px 3px 6px rgba(0,0,0,1)",
        }}
      >
       
        <br />
        <Grid item xs={12} sm={6} lg={6} sx={{ display:"flex", justifyContent:'center' }}>
              <Grid display={"flex"} justifyContent={"center"}>
                <Avatar
                //   src={image ? image : `${baseUrl}${formData?.image}`}
                  src={image}
                  sx={{
                    m: "auto",
                    bgcolor: "#1D5564",
                    width: 200,
                    height: 200,
                    fontSize: 32,
                    marginBottom: "2rem",
                  }}
                />
              </Grid>
            </Grid>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                border: "1px solid #a0aeb7",
                display: "flex",
                marginTop: "1vh",
                marginLeft: "2vh",
                borderRadius: "0.5vh",
                height: "6vh",
              }}
            >
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                ref={fileRef}
              />
            </Grid>

            <Grid item xs={12} marginBottom={"10px"}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#81C2E6",
                  color: "#1F1F29",
                  "&:hover": { backgroundColor: "#81C2E6" },
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default Profile;
