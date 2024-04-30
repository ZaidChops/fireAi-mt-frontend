import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import todoService from "./todoService";

const todosDetails = JSON.parse(localStorage.getItem("todos"));

const initialState = {
  todos: todosDetails ? todosDetails : [],
  isLoading: false,
  isSuccess: false,
  isRejected: false,
  message: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allTodo.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isRejected = false;
        state.message = "";
      })
      .addCase(allTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = action.payload;
        state.isRejected = false;
        state.message = "";
      })
      .addCase(allTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isRejected = true;
        state.message = action.payload;
      })
      .addCase(addTodo.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isRejected = false;
        state.message = "";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = [...state.todos, action.payload];
        state.isRejected = false;
        state.message = "";
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isRejected = true;
        state.message = action.payload;
      })
      .addCase(editTodo.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isRejected = false;
        state.message = "";
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = action.payload;
        state.isRejected = false;
        state.message = "";
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isRejected = true;
        state.message = action.payload;
      })
      .addCase(deletedTodo.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isRejected = false;
        state.message = "";
      })
      .addCase(deletedTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.message = "";
        state.todos = action.payload;
      })
      .addCase(deletedTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isRejected = true;
        state.message = action.payload;
      });
  },
});

// all todo
export const allTodo = createAsyncThunk("TODO/ALL", async (_, thunkAPI) => {
  try {
    const token = await thunkAPI.getState().auth.user.token;

    return await todoService.getTodos(token);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// add todo
export const addTodo = createAsyncThunk("TODO/NEW", async (data, thunkAPI) => {
  try {
    const token = await thunkAPI.getState().auth.user.token;

    return await todoService.addTodo(data, token);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// edit todo
export const editTodo = createAsyncThunk(
  "TODO/EDIT",
  async (data, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;

      return await todoService.editTodo(data, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// deleted todo
export const deletedTodo = createAsyncThunk(
  "TODO/DELETED",
  async (deleteId, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await todoService.deleteTodo(deleteId, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export default todoSlice.reducer;
