import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from '../pages/social/Detail';
import List from '../pages/social/List';
import Write from '../pages/social/Write';
import GameRoom from '../pages/GameRoom';
import Lobby from '../pages/Lobby';
import Missing from '../pages/Missing';
import MyPage from '../pages/MyPage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';
import Chat from '../components/chat/Chat';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/gameroom" element={<GameRoom />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/social/list" element={<List />} />
        <Route path="/social/write" element={<Write />} />
        <Route path="/social/detail" element={<Detail />} />
        <Route path="/*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
}
