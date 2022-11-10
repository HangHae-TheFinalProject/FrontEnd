import React, { useEffect, useRef, useState } from 'react';
import * as SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';

const Chat = () => {
  // <대연,승재> useParam으로 roomId를 확인
  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   connect();
  //   return () => disconnect();
  // }, []);

  // useEffect를 사용 connect를 작동(?)
  const connect = () => {
    client.current = new StompJs.Client({
      // brokerURL은 웹소켓 서버로 직접 접속
      // brokerURL: '',
      webSocketFactory: () => new SockJs(process.env.REACT_APP_WEBSOCKET),
      // <대연,승재> 클론 카카오톡 access, refresh-token을 담아서 보내서 권한을 확인
      connectHeaders: {
        // login: '',
        // passcord: '',
      },
      // 에러 메시지들..?
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
      `/sub/chat/room/72bbb204-4158-4fad-b294-0189ec150760`,
      // body에 담아 보낼 메세지(?)
      ({ body }) => {
        const newMessage = JSON.parse(body).message;
        setChatMessages(newMessage);
      },
      { sender: 'user' }
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
        roomId: '72bbb204-4158-4fad-b294-0189ec150760',
        sender: 'user',
        message: message,
      }),
    });
    // 보내고 나면 인풋을 비워줌
    setMessage('');
  };

  return (
    <>
      {/* {chatMessages && chatMessages.length > 0 && (
        <ul>
          {chatMessages.map((newMessage, index) => (
            <li key={index}>{newMessage.message}</li>
          ))}
        </ul>
      )} */}
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

// 소켓 연결하는 방법
// const socket = new WebSocket('ws://WebSocket');

// 소켓이 연결되면 연결 ok
// socket.onopen = () => {
//   console.log('연결 성공!');
// };

// 소켓이 연결되면 서버로 메세지를 보낼 수 있음
// socket.addEventListener('open', (event) => {
//   socket.send('연결 성공!');
// });
