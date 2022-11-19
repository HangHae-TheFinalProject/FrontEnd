import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';

import Modal from '../../elements/modal/Modal';

import './style.scss';
import room_01 from '../../images/rooms/room_01.jpg';
import room_02 from '../../images/rooms/room_02.jpg';
import room_03 from '../../images/rooms/room_03.jpg';
import room_04 from '../../images/rooms/room_04.jpg';
import room_05 from '../../images/rooms/room_05.jpg';
import room_06 from '../../images/rooms/room_06.jpg';

import { useDispatch } from 'react-redux';
import { setRoom } from '../../redux/modules/roomsSlice';

function ARoom({ roomInfo }) {
  const MAX_NUMBER_OF_PERSON = 8;
  const ARR_MODE = ['', '일반', '바보'];
  const ARR_ROOM_IMAGE_LIST = [room_01, room_02, room_03, room_04, room_05, room_06];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const joinRoom = () => {
    if (roomInfo.member.length >= MAX_NUMBER_OF_PERSON) {
      alert('빈자리가 없습니다.')
      return
    }

    if (roomInfo.roomPassword) {
      setOpenModal(true);
      return
    }

    dispatch(setRoom(roomInfo))
    navigate(`/gameroom/${roomInfo.id}`);
  }

  return <div className='roomBox'>
    <div className='roomInfoBox'>
      {roomInfo.roomPassword ? '🔒' : ''}
      <span>({roomInfo.member.length}/{MAX_NUMBER_OF_PERSON})</span>
      <span>{ARR_MODE[roomInfo.mode]}</span>
    </div>
    <a href='#' onClick={joinRoom}><img src={ARR_ROOM_IMAGE_LIST[roomInfo.id % ARR_ROOM_IMAGE_LIST.length]} /></a>
    <div>{roomInfo.roomName}</div>
    {openModal && <Modal onClose={() => setOpenModal(false)} content={<PasswordModal roomId={roomInfo.id} password={roomInfo.roomPassword} />} />}
  </div>
}

export default ARoom;

function PasswordModal({ roomId, password }) {
  const navigate = useNavigate();
  const [value, inputHandler] = useInput();

  const confirm = () => {
    if (password !== value) {
      alert('땡🔔');
      return
    }
    navigate(`/gameroom/${roomId}`);
  }

  return <div className='sectionModal'>
    <h2>비밀번호를 입력해주세요.</h2>
    <div>
      <input type='password' onChange={inputHandler} />
      <input type='button' value='확인' onClick={confirm} />
    </div>
  </div>
}