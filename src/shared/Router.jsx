import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import SignUp from '../pages/SignUp';
import GameRoom from '../pages/gameroom/GameRoom';
import List from '../pages/social/List';
import Write from '../pages/social/Write';
import Detail from '../pages/social/Detail';
import Social from '../pages/social/Social';
import Lobby from '../pages/lobby/Lobby';
import Missing from '../pages/Missing';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/social" element={<Social />} />
        <Route path="/gameroom" element={<GameRoom />} />
        <Route path="/gameroom/:id" element={<GameRoom />} />
        <Route path="/social/list" element={<List />} />
        <Route path="/social/write" element={<Write />} />
        <Route path="/social/detail" element={<Detail />} />
        <Route path="/*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
}
