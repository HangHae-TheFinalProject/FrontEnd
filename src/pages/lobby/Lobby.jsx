import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../elements/modal/Modal';
import RoomList from '../../components/roomList/RoomList';
import CreateRoomForm from '../../components/createRoomForm/CreateRoomForm';
import lobbyBackGround from '../../images/png/lobbyBackGround.png';
import roomMakerBtn from '../../images/png/roomMakerBtn.png';
import LobbyHeader from '../../components/robbyHeader/RobbyHeader';

import { setIsCamera, setIsCantGetDevice } from '../../redux/modules/gameSlice'
import './style.scss';

// import BGM from '../../audio/lobbyBGM.mp3';

function Lobby() {
  const [openModal, setOpenModal] = useState(false);
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
    <div className="pagesection">
      <img src={lobbyBackGround} className="background" />
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
        onClick={craeteRoomHandler}
        className="createBtn"
      />
    </div>
  );
}

export default Lobby;
