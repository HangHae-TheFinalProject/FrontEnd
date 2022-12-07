import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../elements/modal/Modal';

import headerArrow from '../../images/png/headerArrow.png';
import MyPageForm from '../myPage/myPageForm/MyPageForm';

import './style.scss';

function LobbyHeader() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="lobbyHeaderBackground fontLightBold">
        <header className="lobbyHeader">
          <h1>로비</h1>
        </header>
        <div className="lobbyHeaderCommunityBox">
          <div
            className="lobbyHeaderCommunityBtn"
            onClick={() => navigate('/social')}
          >
            <img src={headerArrow} alt="headerArrow" />
            <span>커뮤니티</span>
          </div>
          {openModal && (
            <Modal
              onClose={() => setOpenModal(false)}
              content={<MyPageForm />}
            />
          )}
          <span onClick={() => setOpenModal(true)}>마이페이지</span>
        </div>
      </div>
    </>
  );
}

export default LobbyHeader;
