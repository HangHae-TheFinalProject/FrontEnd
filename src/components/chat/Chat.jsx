import React, { useEffect, useRef, useState } from 'react';
import * as SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { Cookies } from 'react-cookie';
import './style.scss';
import chatOutputBox from '../../images/svg/chatOutputBox.svg';
import btn_send2 from '../../images/svg/btn_send2.svg';

function Chat({ id }) {
  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');

  const nickname = sessionStorage.getItem('nickname');
  const realnickname = sessionStorage.getItem('realnickname');

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJs(`${process.env.REACT_APP_API_URL}/ws-stomp`),
      connectHeaders: {
        Authorization: new Cookies().get('access_token'),
        'Refresh-Token': new Cookies().get('refresh_token'),
      },
      debug: function (str) {
      },
      onConnect: () => {
        subscribe();
        if (realnickname) {
          client.current.publish({
            destination: '/pub/chat/message',
            body: JSON.stringify({
              type: 'ENTER',
              roomId: id,
              sender: nickname,
              message: `${realnickname}님이 게임에 참가하셨습니다.`,
            }),
          });
        } else {
          return;
        }
      },
      onStompError: (frame) => {
      },
    });
    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(`/sub/chat/room/${id}`, ({ body }) => {
      setChatMessages((newMessage) => [...newMessage, JSON.parse(body)]);
    });
  };

  const publish = (message) => {
    if (!client.current.connected) {
      return;
    } else if (message === '') {
      alert('채팅 내용을 입력해주세요.');
      return;
    }
    client.current.publish({
      destination: '/pub/chat/message',
      body: JSON.stringify({
        type: 'TALK',
        roomId: id,
        sender: nickname,
        message: message,
      }),
    });
    setMessage('');
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  return (
    <div className="chatBoxSection fontSemiBold">
      <img src={chatOutputBox} alt="chatArea" className="chatOutputBox" />
      <div className="chatOutputBoxInner">
        {chatMessages && chatMessages.length > 0 && (
          <div>
            {chatMessages?.map((newMessage, index) => {
              if (newMessage.type === 'ENTER') {
                return (
                  <div
                    key={index}
                    className="anotherChatMessage"
                  >{`${newMessage.message}`}</div>
                );
              }
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
  );
}

export default Chat;
