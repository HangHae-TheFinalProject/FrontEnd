import { useEffect, useState } from 'react';

import Modal from '../../elements/modal/Modal';
import RoomList from '../../components/roomList/RoomList';
import CreateRoomForm from '../../components/createRoomForm/CreateRoomForm';
import lobbyBackGround from '../../images/png/lobbyBackGround.png';
import roomMakerBtn from '../../images/png/roomMakerBtn.png';
import LobbyHeader from '../../components/robbyHeader/RobbyHeader';

import './style.scss';

function Lobby() {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="pagesection">
      <img src={lobbyBackGround} className="roombackground" />
      <LobbyHeader></LobbyHeader>
      <RoomList />
      {openModal && (
        <Modal
          onClose={() => setOpenModal(false)}
          content={<CreateRoomForm />}
        />
      )}

      <img
        src={roomMakerBtn}
        type="button"
        value="방만들기"
        onClick={() => setOpenModal(true)}
        className="createBtn"
      />
    </div>
  );
}

export default Lobby;
