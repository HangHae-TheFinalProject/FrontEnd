import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRoom } from '../../redux/modules/roomsSlice';

import useInput from '../../hooks/useInput';
import Modal from '../../elements/modal/Modal';

import door1 from '../../images/png/door1.png';
import door2 from '../../images/png/door2.png';
import door3 from '../../images/png/door3.png';
import door4 from '../../images/png/door4.png';
import { ReactComponent as IcLock } from '../../images/svg/IcLock.svg';
import passwordLayout from '../../images/png/passwordLayout.png';

import './style.scss';

function ARoom({ roomInfo }) {
  const MAX_NUMBER_OF_PERSON = 8;
  const ARR_MODE = ['', '일반', '바보'];
  const ARR_ROOM_IMAGE_LIST = [door1, door2, door3, door4];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const joinRoom = () => {
    if (roomInfo.member.length === 0) {
      alert('게임이 종료된 방입니다.');
      return;
    }

    if (roomInfo.member.length >= MAX_NUMBER_OF_PERSON) {
      alert('빈자리가 없습니다.');
      return;
    }

    if (roomInfo.status === 'start') {
      alert('게임이 진행중입니다.');
      return;
    }

    if (roomInfo.roomPassword) {
      setOpenModal(true);
      return;
    }
    console.log('ARoom');
    console.log(roomInfo);
    dispatch(setRoom(roomInfo));
    navigate(`/gameroom/${roomInfo.id}`);
  };

  useEffect(() => {

  }, [])

  return (
    <div className="roomBox fontBold">
      <div className="roomInfoBox">
        <div className="modeCheck">{roomInfo.mode}</div>
        <span>{ARR_MODE[roomInfo.mode]}</span>
      </div>
      <a href="#" onClick={joinRoom}>
        <img
          className="doorImg"
          src={ARR_ROOM_IMAGE_LIST[roomInfo.id % ARR_ROOM_IMAGE_LIST.length]}
          alt="doorImg"
        />
      </a>
      <div className="roomName">
        <p>{roomInfo.roomPassword ? <IcLock /> : ''}</p>
        <p>{roomInfo.roomName}</p>
      </div>
      <span className="memderLength">
        {roomInfo.member.length}/{MAX_NUMBER_OF_PERSON}
      </span>
      {openModal && (
        <Modal
          onClose={() => setOpenModal(false)}
          content={
            <PasswordModal
              roomId={roomInfo.id}
              password={roomInfo.roomPassword}
            />
          }
        />
      )}
    </div>
  );
}

export default ARoom;

function PasswordModal({ roomId, password }) {
  const navigate = useNavigate();
  const [value, inputHandler] = useInput();

  const confirm = () => {
    if (password !== value) {
      alert('땡🔔');
      return;
    }
    navigate(`/gameroom/${roomId}`);
  };

  return (
    <div>
      <img className="sectionModal" src={passwordLayout} alt="passwordModal" />
      <div className="passwordBox fontLightBold">
        <h2>비밀번호</h2>
        <div className="passwordInputSet fontSemiBold">
          <input
            placeholder="방 비밀번호를 입력해주세요."
            className="passwordInput"
            type="text"
            onChange={inputHandler}
          />
          <input
            className="passwordBtn"
            type="button"
            value="입력"
            onClick={confirm}
          />
        </div>
      </div>
    </div>
  );
}
