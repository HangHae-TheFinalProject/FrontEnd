import { configureStore } from '@reduxjs/toolkit';

import rooms from '../modules/roomsSlice';
import game from '../modules/gameSlice';

const store = configureStore({
  reducer: {
    game: game,
    rooms: rooms,
  },
  devTools: false,
});

export default store;
