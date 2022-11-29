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
      <div className="headerbackground fontLightBold">
        <header className="headerBtnBox">
          <div className="communityBox" onClick={() => navigate('/social')}>
            <img src={headerArrow} alt="headerArrow" />
            <span>커뮤니티</span>
          </div>
          <h1>로비</h1>
          <span onClick={() => setOpenModal(true)}>마이페이지</span>
          {openModal && (
            <Modal
              onClose={() => setOpenModal(false)}
              content={<MyPageForm />}
            />
          )}
        </header>
      </div>
    </>
  );
}

export default LobbyHeader;
