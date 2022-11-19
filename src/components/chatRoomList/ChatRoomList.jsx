// --------------------------------
// 삭제예정
// --------------------------------

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { chat } from '../../shared/Request';
import TempSign from '../temp_sign/TempSign';

const ChatRoomList = () => {
  const [room, setRoom] = useState(null);
  const [addRoom, setAddRoom] = useState('');
  const navigate = useNavigate();

  // 전체 방 조회하기
  const getAllChatRoom = async () => {
    try {
      const { data } = await chat.get(
        'http://13.125.214.86:8080/lier/chat/rooms'
      );
      setRoom(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 방 추가하기
  const addChatRoom = async (payload) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const response = await chat.post(
        'http://13.125.214.86:8080/lier/chat/room',
        payload,
        config
      );
      console.log(response);
      // 채팅방을 생성한 후 새로운 채팅방을 조회, 인풋을 비워주는 조건문을 사용
      if (response.status === 200) {
        getAllChatRoom();
        setAddRoom('');
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // getAllChatRoom을 실행시키기 위한 useEffect
  useEffect(() => {
    getAllChatRoom();
  }, []);

  return (
    <>
      <TempSign />
      <input
        placeholder="채팅방 제목"
        value={addRoom}
        onChange={(e) => setAddRoom(e.target.value)}
      />
      <button
        onClick={() => {
          addChatRoom({ name: addRoom });
        }}
      >
        Add
      </button>
      {room?.map((item) => (
        <div
          key={item.roomId}
          item={item}
          onClick={() => navigate(`/chatroom/${item.roomId}`)}
        >
          <div style={{ cursor: 'pointer' }}>{item.name}</div>
        </div>
      ))}
    </>
  );
};

export default ChatRoomList;
