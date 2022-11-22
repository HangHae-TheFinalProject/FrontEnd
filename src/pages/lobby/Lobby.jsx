import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../elements/modal/Modal';
import RoomList from '../../components/roomList/RoomList';
import CreateRoomForm from '../../components/createRoomForm/CreateRoomForm';
import lobbyBackGround from '../../images/png/lobbyBackGround.png';
import roomMakerBtn from '../../images/png/roomMakerBtn.png';

import './style.scss';

function Lobby() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="pagesection">
      {/* <img src={lobbyBackGround} className="background" /> */}
      <div>
        <input
          type="button"
          value="커뮤니티"
          onClick={() => navigate('/social/list')}
        />
        <input
          type="button"
          value="마이페이지"
          onClick={() => navigate('/mypage')}
        />
      </div>
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
      />
    </div>
  );
}

export default Lobby;
