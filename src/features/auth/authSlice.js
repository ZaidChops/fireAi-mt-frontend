import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import authService from "./authService";

const userDetail = JSON.parse(localStorage.getItem("user"))

const initialState = {
  user: userDetail ? userDetail : {} ,
  isLoading: false,
  isSucccess: false,
  isRejected: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  //   logoutUser : (state,action)=>{
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("todos");
  //   return state
  // }
},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.isLoading = true;
        state.isSucccess = false;
        state.isRejected = false;
        state.message = "";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucccess = true;
        state.isRejected = false;
        state.user = action.payload;
        state.message = "";
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucccess = false;
        state.isRejected = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.isSucccess = false;
        state.isRejected = false;
        state.message = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucccess = true;
        state.isRejected = false;
        state.user = action.payload;
        state.message = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucccess = false;
        state.isRejected = true;
        state.message = action.payload;
      });
  },
});

export const signup = createAsyncThunk(
  "AUTH/SIGNUP",
  async (data, thunkAPI) => {
    try {
      return await authService.signup(data);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const login = createAsyncThunk("AUTH/LOGIN", async (data, thunkAPI) => {
  try {
    return await authService.login(data);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const  {logoutUser}  = authSlice.actions;

export default authSlice.reducer;
