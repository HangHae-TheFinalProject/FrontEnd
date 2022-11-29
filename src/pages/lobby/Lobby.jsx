import { useState } from 'react';

import Modal from '../../elements/modal/Modal';
import RoomList from '../../components/roomList/RoomList';
import CreateRoomForm from '../../components/createRoomForm/CreateRoomForm';
import lobbyBackGround from '../../images/png/lobbyBackGround.png';
import roomMakerBtn from '../../images/png/roomMakerBtn.png';
import LobbyHeader from '../../components/lobbyHeader/LobbyHeader';

import { setIsCamera, setIsCantGetDevice } from '../../redux/modules/gameSlice';
import { useDispatch } from 'react-redux';
import './style.scss';

function Lobby() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  let isCantGetDevice = false;

  navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then((res) => {
      console.log(res.getAudioTracks());
      console.log(res.getVideoTracks());

      dispatch(
        setIsCamera(
          res.getVideoTracks()[0] || res.getAudioTracks()[0] ? true : false
        )
      );
      isCantGetDevice = false;
    })
    .catch((err) => {
      alert(
        '다른 브라우저에서 마이크 또는 비디오를 사용중입니다. 게임방 입장이 어려울 수 있습니다.'
      );
      isCantGetDevice = true;
      dispatch(setIsCantGetDevice(isCantGetDevice));
    });

  const craeteRoomHandler = () => {
    if (isCantGetDevice) {
      alert(
        '다른 브라우저에서 마이크 또는 비디오를 사용중입니다. 게임방 입장이 어려울 수 있습니다.'
      );
      return;
    }
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
