import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


// need to : API connection

const initialState = {
  rooms: [],
  room: {},
  isLoading: false,
  error: null
};

export const __getRoom = createAsyncThunk(
  'rooms/getRoom',
  async (payload, thunkAPI) => {
    try{
      return thunkAPI.fulfillWithValue();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getRooms = createAsyncThunk(
  'rooms/getRooms',
  async (payload, thunkAPI) => {
    try{
      return thunkAPI.fulfillWithValue();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: {
    [__getRoom.pending]: (state) => {
      state.isLoading = true;
    },
    [__getRoom.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [__getRoom.rejected]: (state) => {
      state.isLoading = false;
    },
    [__getRooms.pending]: (state) => {
      state.isLoading = true;
    },
    [__getRooms.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [__getRooms.rejected]: (state) => {
      state.isLoading = false;
    }
  }
});

export const {} = roomsSlice.actions;
export default roomsSlice.reducer;