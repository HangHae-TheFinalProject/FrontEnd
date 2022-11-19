import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/Request";


// need to : API connection
const initialState = {
  rooms: [],
  room: {},
  maxPage: 0,
  isLoading: false,
  error: null
};

// export const __getRoom = createAsyncThunk(
//   'rooms/getRoom',
//   async (payload, thunkAPI) => {
//     try{
//       return thunkAPI.fulfillWithValue();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const __getRooms = createAsyncThunk(
  'rooms/getRooms',
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.get(`/lier/rooms/${payload}`)
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      alert('방을 찾을 수 없습니다.');
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoom(state, action) {
      state.room = action.payload;
    }
  },
  extraReducers: {
    [__getRooms.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getRooms.fulfilled]: (state, action) => {
      state.rooms = action.payload.roomsInPage;
      state.maxPage = action.payload.pageCnt;
      state.isLoading = false;
    },
    [__getRooms.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

export const { setRoom } = roomsSlice.actions;
export default roomsSlice.reducer;