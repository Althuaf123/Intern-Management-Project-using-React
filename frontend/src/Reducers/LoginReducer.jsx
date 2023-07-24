import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";


export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (user, { rejectWithValue } ) => {
    console.log(user);
    console.log(user.email);
    try {
      const response = await axios.post("/api/login/", user);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      
      const users = await axios.get("/api/", {
        params: {
          email: user.email
        }
      });
      console.log(response)
      console.log(response.data)
      const userData = users.data;

      localStorage.setItem("user", JSON.stringify(userData));
      if (users.data.is_administrator===true){
        const administrator = await axios.get(`api/get/users/${userData.id}`)
        console.log(administrator)
        localStorage.setItem("administrator",JSON.stringify(administrator.data))
      }

      console.log(users)
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);


const token = localStorage.getItem('access')

const initialState = {
  loading: false,
  success: false,
  error: {},
  isAuthenticated: token?true:false,
  user: JSON.parse(localStorage.getItem("user")) || {},
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh")
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout:(state) =>{
        state.success = false;
        state.isAuthenticated = false;
        state.access = null;
        state.refresh = null;
        state.user = {};      
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        localStorage.removeItem("user")
        localStorage.removeItem("administrator")
      },
    setUser:(state,action)=>{
      state.user=action.payload
      console.log(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = {};
        state.isAuthenticated = true;
        state.user= JSON.parse(localStorage.getItem("user"))
        state.access = localStorage.getItem("access");
        state.refresh = localStorage.getItem("refresh");
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || action.error;
        state.access = null;
        state.refresh = null;
      });
  }
});

export const {logout,setUser} = loginSlice.actions
export default loginSlice.reducer;