// --------------------------------
// 삭제예정
// --------------------------------


import React, { useEffect } from 'react';
import { chat } from '../../shared/Request';
import Chat from '../chat/Chat';

import instance from '../../shared/Request';

import './style.scss';

const ChatRoom = ({ id }) => {

  // 방 입장 (권한 필요)
  const getChatRoom = async () => {
    try {
      const { data } = await instance.get(
        `/lier/chat/room/enter/${id}`
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // getChatRoom을 실행시키기 위한 useEffect
  useEffect(() => {
    getChatRoom();
  }, []);

  return (
    <>
      <div className="ChatContainer">
        <Chat />
      </div>
    </>
  );
};

export default ChatRoom;
