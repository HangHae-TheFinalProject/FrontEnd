import React, { useEffect, useRef, useState } from 'react';
import * as SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { useCookies } from 'react-cookie';
import './style.scss';
import chatOutputBox from '../../images/svg/chatOutputBox.svg';
import btn_send2 from '../../images/svg/btn_send2.svg';

const Chat = ({ id }) => {
  const [cookie] = useCookies();

  const connectHeaders = {
    Authorization: cookie['access_token'],
    'Refresh-Token': cookie['refresh_token'],
  };

  const client = useRef({});

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');

  const nickname = sessionStorage.getItem('nickname');

  // stomp 연결
  const connect = () => {
    console.log(connectHeaders);
    console.log('connect');
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJs('https://haetae.shop/ws-stomp'),
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
    console.log('disconnect');
    client.current.deactivate();
  };

  // stomp 구독
  const subscribe = () => {
    console.log('subscribe');
    client.current.subscribe(
      // 특정 채팅방에 구독하기
      `/sub/chat/room/${id}`,
      // body에 담아 보낼 메세지(?)
      ({ body }) => {
        console.log(body);
        setChatMessages((newMessage) => [...newMessage, JSON.parse(body)]);
      }
    );
  };

  // stomp 메세지
  const publish = (message) => {
    // 연결이 되지 않으면 return
    // 빈 내용을 입력하면 알림을 띄우고 return
    if (!client.current.connected) {
      return;
    } else if (message === '') {
      alert('채팅 내용을 입력해주세요.');
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
    console.log(id);
    connect();
    return () => disconnect();
  }, []);

  return (
    <>
      <div className="chatBoxSection">
        <img src={chatOutputBox} alt="chatArea" className="chatOutputBox" />
        <div className="chatOutputBoxInner">
          {chatMessages && chatMessages.length > 0 && (
            <div>
              {chatMessages?.map((newMessage, index) => (
                <div
                  key={index}
                >{`${newMessage.sender.replace(/#\d*/, '')}: ${newMessage.message}`}</div>
              ))}
            </div>
          )}
        </div>
        <div className="chatInputContainer">
          <input
            className="chatInputBox fontSemiBold"
            type="text"
            placeholder="채팅을 입력해주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && publish(message)}
          />
          <img
            src={btn_send2}
            alt="send"
            className="chatInputButton"
            onClick={() => publish(message)}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
