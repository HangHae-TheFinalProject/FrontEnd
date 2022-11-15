import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { chat } from '../../shared/Request';
import Chat from './Chat';

const ChatRoomDetail = () => {
  const { id } = useParams();

  // getChatRoom을 실행시키기 위한 useEffect
  useEffect(() => {
    getChatRoom();
  }, []);

  // 방 입장 (권한 필요)
  const getChatRoom = async () => {
    try {
      const { data } = await chat.get(`/chat/room/enter/${id}`);
      sessionStorage.setItem('username', data.data.nickname);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Chat />
    </>
  );
};

export default ChatRoomDetail;
