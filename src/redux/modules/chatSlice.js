import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chat: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = chatSlice.actions;
export default chatSlice.reducer;
