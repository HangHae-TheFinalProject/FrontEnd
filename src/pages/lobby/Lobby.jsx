import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../elements/modal/Modal';
import RoomList from '../../components/roomList/RoomList';
import CreateRoomForm from '../../components/createRoomForm/CreateRoomForm';
import lobbyBackGround from '../../images/png/lobbyBackGround.png';
import roomMakerBtn from '../../images/png/roomMakerBtn.png';
import LobbyHeader from '../../components/lobbyHeader/LobbyHeader';

import { setIsCamera, setIsCantGetDevice } from '../../redux/modules/gameSlice'
import './style.scss';

// import BGM from '../../audio/lobbyBGM.mp3';

function Lobby() {
  const dispatch = useDispatch();
  const BGM = new Audio('../../audio/lobbyBGM.mp3');
  let isCantGetDevice = false;

  const craeteRoomHandler = () => {
    setOpenModal(true)
  }

  useEffect(() => {
    console.log('useEffect');
  }, [])

  return (
    <div className="lobbyPageSection fontLightBold">
      <img
        className="lobbyBackGround"
        src={lobbyBackGround}
        alt="lobbyBackGround"
      />
      <LobbyHeader />
      <RoomList />
      {openModal && (
        <Modal
          onClose={() => setOpenModal(false)}
          content={<CreateRoomForm />}
        />
      )}
      <img
        className="gameRoomCreateBtn"
        src={roomMakerBtn}
        alt="roomMakerBtn"
        onClick={craeteRoomHandler}
      />
    </div>
  );
}

export default Lobby;
