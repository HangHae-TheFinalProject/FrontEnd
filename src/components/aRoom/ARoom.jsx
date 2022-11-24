import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';

import Modal from '../../elements/modal/Modal';

import './style.scss';
import door1 from '../../images/png/door1.png';
import door2 from '../../images/png/door2.png';
import door3 from '../../images/png/door3.png';
import door4 from '../../images/png/door4.png';
import { ReactComponent as IcLock } from '../../images/svg/IcLock.svg';
import { ReactComponent as icArrowLeft } from '../../images/svg/icArrowLeft.svg';

import { useDispatch, useSelector } from 'react-redux';
import { setRoom } from '../../redux/modules/roomsSlice';

function ARoom({ roomInfo }) {
  const MAX_NUMBER_OF_PERSON = 8;
  const ARR_MODE = ['', '일반', '바보'];
  const ARR_ROOM_IMAGE_LIST = [door1, door2, door3, door4];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const isCantGetDevice = useSelector(state => state.game.isCantGetDevice);

  const joinRoom = () => {

    if (isCantGetDevice) {
      alert('다른 브라우저에서 마이크 또는 비디오를 사용중입니다. 게임방 입장이 어려울 수 있습니다.');
      return;
    }

    if (roomInfo.member.length >= MAX_NUMBER_OF_PERSON) {
      alert('빈자리가 없습니다.');
      return;
    }

    if (roomInfo.roomPassword) {
      setOpenModal(true);
      return;
    }

    dispatch(setRoom(roomInfo));
    navigate(`/gameroom/${roomInfo.id}`);
  };

  useEffect(() => {
    console.log(isCantGetDevice);
  },)

  return (
    <>
      <div className="roomBox">
        <div className="roomInfoBox">
          <div className="modeCheck">{roomInfo.mode}</div>
          <span>{ARR_MODE[roomInfo.mode]}</span>
        </div>

        <a href="#" onClick={joinRoom}>
          <img
            className="doorImg"
            src={ARR_ROOM_IMAGE_LIST[roomInfo.id % ARR_ROOM_IMAGE_LIST.length]}
          />
        </a>

        <div className="roomName">
          <p> {roomInfo.roomPassword ? <IcLock /> : ''}</p>
          <p>{roomInfo.roomName}</p>
        </div>

        <span className="memderLength">
          ({roomInfo.member.length}/{MAX_NUMBER_OF_PERSON})
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
    </>
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
    <div className="sectionModal">
      <h2>비밀번호를 입력해주세요.</h2>
      <div>
        <input type="password" onChange={inputHandler} />
        <input type="button" value="확인" onClick={confirm} />
      </div>
    </div>
  );
}
