import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios"

const initialState = {
  loading: false,
  success: false,
  error: {}
};

export const saveUserAsync = createAsyncThunk(
  "register/saveUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/create/user/", user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const saveUserReset = createSlice({
    name: 'register',
    initialState: {
      loading: false,
      success: false,
      error: {},
    },
    reducers: {
      resetRegisterState: (state) => {
        state.loading = false;
        state.success = false;
        state.error = {};
      },
    },
  });
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveUserAsync.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.error = {};
        if(action.payload.error){
            console.log(action.payload.error)
        }
      })
      .addCase(saveUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        console.log(action.payload.error)
      })
      .addCase(saveUserReset, (state) => {
        state.loading = false;
        state.success = false;
        state.error = {};
      });
  }
});

export default registerSlice.reducer;
