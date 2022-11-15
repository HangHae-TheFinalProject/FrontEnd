import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chat: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
});

export default chatSlice.reducer;
