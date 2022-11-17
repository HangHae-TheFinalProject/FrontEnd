import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from '../pages/social/Detail';
import List from '../pages/social/List';
import Write from '../pages/social/Write';
import GameRoom from '../pages/gameroom/GameRoom';
import Lobby from '../pages/lobby/Lobby';
import Missing from '../pages/Missing';
import MyPage from '../pages/MyPage';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';

export default function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/lobby' element={<Lobby />} />
        <Route path='/gameroom' element={<GameRoom />} />
        <Route path='/gameroom/:id' element={<GameRoom />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/social/list' element={<List />} />
        <Route path='/social/write' element={<Write />} />
        <Route path='/social/detail' element={<Detail />} />
        <Route path='/*' element={<Missing />} />
      </Routes>
    </BrowserRouter>
  )
}

