import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cookies } from 'react-cookie';

export const __getRooms = createAsyncThunk(
  'rooms/getRooms',
  async (payload, thunkAPI) => {
    const config = {
      headers: {
        authorization: new Cookies().get('access_token'),
        'refresh-token': new Cookies().get('refresh_token'),
      },
    };
    try {
      const { data } = await axios.get(
        `https://haetae.shop/lier/rooms/${payload}`,
        config
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      alert('방을 찾을 수 없습니다.');
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  rooms: [],
  room: {},
  maxPage: 0,
  isLoading: false,
  error: null,
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoom(state, action) {
      state.room = action.payload;
    },
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
    },
  },
});

export const { setRoom } = roomsSlice.actions;
export default roomsSlice.reducer;
