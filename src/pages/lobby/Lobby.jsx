import { useState } from 'react';

import Modal from '../../elements/modal/Modal';
import RoomList from '../../components/roomList/RoomList';
import CreateRoomForm from '../../components/createRoomForm/CreateRoomForm';
import LobbyHeader from '../../components/lobbyHeader/LobbyHeader';
import lobbyBackGround from '../../images/png/lobbyBackGround.png';
import roomMakerBtn from '../../images/png/roomMakerBtn.png';

import './style.scss';

// import BGM from '../../audio/lobbyBGM.mp3';

function Lobby() {
  const [openModal, setOpenModal] = useState(false);
  const BGM = new Audio('../../audio/lobbyBGM.mp3');

  const craeteRoomHandler = () => {
    setOpenModal(true);
  };

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
          content={
            <CreateRoomForm openModal={openModal} setOpenModal={setOpenModal} />
          }
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
