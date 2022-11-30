import React, { useEffect, useRef, useState } from 'react';
import * as SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { Cookies } from 'react-cookie';
import './style.scss';
import chatOutputBox from '../../images/svg/chatOutputBox.svg';
import btn_send2 from '../../images/svg/btn_send2.svg';

const Chat = ({ id }) => {
  const client = useRef({});

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');

  const nickname = sessionStorage.getItem('realnickname');

  // stomp 연결
  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJs('https://haetae.shop/ws-stomp'),
      connectHeaders: {
        Authorization: new Cookies().get('access_token'),
        'Refresh-Token': new Cookies().get('refresh_token'),
      },
      debug: function (str) {
        console.log('debug', str);
      },
      onConnect: () => {
        subscribe();
        // 채팅 입장 메세지(?)
        client.current.publish({
          // destination: `/pub/chat/room/${id}}`,
          destination: '/pub/chat/message',
          body: JSON.stringify({
            type: 'ENTER',
            roomId: id,
            sender: nickname,
            message: `${nickname}님이 게임에 참가하셨습니다.`,
          }),
        });
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
        console.log('메세지', body);
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
    connect();
    return () => disconnect();
  }, []);

  return (
    <>
      <div className="chatBoxSection fontSemiBold">
        <img src={chatOutputBox} alt="chatArea" className="chatOutputBox" />
        <div className="chatOutputBoxInner">
          {chatMessages && chatMessages.length > 0 && (
            <div>
              {chatMessages?.map((newMessage, index) => {
                if (newMessage.sender === nickname) {
                  return (
                    <div
                      key={index}
                      className="myChatMessage"
                    >{`${newMessage.sender.replace(/#\d*/, '')}: ${
                      newMessage.message
                    }`}</div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className="anotherChatMessage"
                    >{`${newMessage.sender.replace(/#\d*/, '')}: ${
                      newMessage.message
                    }`}</div>
                  );
                }
              })}
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
