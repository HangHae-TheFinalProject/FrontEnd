import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Missing from '../pages/Missing';
import Main from '../pages/Main';
import ChatRoom from '../components/chatRoom/ChatRoom';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chatroom/:id" element={<ChatRoom />} />
        <Route path="/*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
}
