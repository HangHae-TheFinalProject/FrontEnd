import { configureStore } from '@reduxjs/toolkit';
import chat from '../modules/chatSlice';

const store = configureStore({
  reducer: { chat },
});

export default store;
