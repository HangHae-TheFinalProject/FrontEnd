import React, { useEffect, useRef, useState } from 'react';
import * as SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const baseURL = process.env.REACT_APP_BASEURL;
const connectHeaders = {
  Authorization: new Cookies().get('access_token'),
  'Refresh-Token': new Cookies().get('refresh_token'),
};

const Chat = () => {
  // <대연,승재> useParam으로 roomId를 확인
  const { id } = useParams();
  const client = useRef({});

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');

  const username = sessionStorage.getItem('username');

  // connect를 실행시키기 위한 useEffect
  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      // brokerURL은 웹소켓 서버로 직접 접속
      // brokerURL: '',
      webSocketFactory: () => new SockJs(`${baseURL}/ws-stomp`),
      connectHeaders,
      // 디버그 메시지들..?
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

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(
      // 특정 채팅방에 구독하기
      `/sub/chat/room/${id}`,
      // body에 담아 보낼 메세지(?)
      ({ body }) => {
        setChatMessages((newMessage) => [...newMessage, JSON.parse(body)]);
      }
    );
  };

  const publish = (message) => {
    // 연결이 되지 않으면 return
    if (!client.current.connected) {
      return;
    }
    // 연결이 된다면 메세지 보내기
    client.current.publish({
      // 메세지를 보내는 url
      destination: '/pub/chat/message',
      // body에 담아 보낼 내용(?)
      // type: 타입(?), roomId: 방번호, sender: 보내는이, message: input
      body: JSON.stringify({
        type: 'TALK',
        roomId: id,
        sender: username,
        message: message,
      }),
    });
    // 보내고 나면 인풋을 비워줌
    setMessage('');
  };

  return (
    <>
      {chatMessages && chatMessages.length > 0 && (
        <ul>
          {chatMessages?.map((newMessage, index) => (
            <li key={index}>{`${username}: ${newMessage.message}`}</li>
          ))}
        </ul>
      )}
      <input
        type="text"
        placeholder="내용을 입력하세요."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.keyCode === 13 && publish(message)}
      />
      <button onClick={() => publish(message)}>send</button>
    </>
  );
};

export default Chat;
