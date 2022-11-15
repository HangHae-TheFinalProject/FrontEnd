import { configureStore } from '@reduxjs/toolkit';
import rooms from '../modules/roomsSlice';

const store = configureStore({
  reducer: { rooms: rooms },
});

export default store;
