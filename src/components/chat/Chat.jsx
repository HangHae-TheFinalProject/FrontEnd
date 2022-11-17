import React, { useEffect, useRef, useState } from 'react';
import * as SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import './style.scss';

const connectHeaders = {
  Authorization: new Cookies().get('access_token'),
  'Refresh-Token': new Cookies().get('refresh_token'),
};

const Chat = () => {
  const { id } = useParams();
  const client = useRef({});

  const [participants, setParticipants] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');

  const nickname = sessionStorage.getItem('nickname');

  // stomp 연결
  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJs('http://13.125.214.86:8080/ws-stomp'),
      connectHeaders,
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.log(`Broker reported error: ${frame.headers['message']}`);
        console.log(`Additional details: ${frame.body}`);
      },
    });
    client.current.activate();
  };

  // stomp 연결 취소
  const disconnect = () => {
    client.current.deactivate();
  };

  // stomp 구독
  const subscribe = () => {
    client.current.subscribe(
      // 특정 채팅방에 구독하기
      `/sub/chat/room/${id}`,
      // body에 담아 보낼 메세지(?)
      ({ body }) => {
        const users = JSON.parse(body);
        setParticipants(users);
        setChatMessages((newMessage) => [...newMessage, JSON.parse(body)]);
      }
    );
  };

  // stomp 메세지
  const publish = (message) => {
    // 연결이 되지 않으면 return
    if (!client.current.connected) {
      return;
    }
    // 연결이 된다면 메세지 보내기
    client.current.publish({
      // 메세지를 보내는 경로
      destination: '/pub/chat/message',
      // body에 담아 보낼 내용(?)
      // type: 타입(?), roomId: 방번호, sender: 보내는이, message: input
      body: JSON.stringify({
        type: 'TALK',
        roomId: id,
        sender: nickname,
        message: message,
      }),
    });
    // 보내고 나면 인풋을 비워줌
    setMessage('');
  };

  // connect를 실행시키기 위한 useEffect
  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  return (
    <>
      <div className="ChatBox">
        <div className="ChatOutputBox">
          {chatMessages && chatMessages.length > 0 && (
            <div>
              {chatMessages?.map((newMessage, index) => (
                <div
                  key={index}
                >{`${newMessage.sender}: ${newMessage.message}`}</div>
              ))}
            </div>
          )}
        </div>
        <div className="ChatInputContainer">
          <input
            className="ChatInputBox"
            type="text"
            placeholder="채팅을 입력해주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && publish(message)}
          />
          <button className="ChatInputButton" onClick={() => publish(message)}>
            send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
