import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { chat } from '../../shared/Request';
import Chat from '../chat/Chat';

import './style.scss';

const ChatRoom = ({ chatMessages }) => {
  const { id } = useParams();

  // 방 입장 (권한 필요)
  const getChatRoom = async () => {
    try {
      const { data } = await chat.get(
        `http://13.125.214.86:8080/lier/chat/room/enter/${id}`
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
