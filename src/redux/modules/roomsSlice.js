import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../shared/Request';

export const __getRooms = createAsyncThunk(
  'rooms/getRooms',
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.get(`/lier/rooms/${payload.page}/view/${payload.view}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      alert('방을 찾을 수 없습니다.');
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  rooms: [],
  room: {
    id: 0,
    member: [
      {
        createdAt: '',
        modifiedAt: '',
        email: '',
        memberId: 0,
        nickname: '',
        password: ''
      }, {
        createdAt: '',
        modifiedAt: '',
        email: '',
        memberId: 0,
        nickname: '',
        password: ''
      }
    ],
    mode: 1,
    owner: '',
    roomName: '',
    roomPassword: '',
    status: ''
  },
  maxPage: 0,
  isLoading: false,
  error: null
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoom(state, action) {
      state.room = action.payload;
    },
    setOwner(state, action) {
      state.room.owner = action.payload;
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
    },
  },
});

export const { setRoom, setOwner } = roomsSlice.actions;
export default roomsSlice.reducer;
