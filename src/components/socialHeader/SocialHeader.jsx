import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../elements/modal/Modal';
import headerArrow from '../../images/png/headerArrow.png';
import MyInfoForm from '../myPage/myPageForm/MyPageForm';

import './style.scss';
function SocialHeader() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="headerbackground fontLightBold">
        <header className="headerBtnBox">
          <div className="lobbyBox" onClick={() => navigate('/lobby')}>
            <img src={headerArrow} alt="headerArrow" />
            <span>로비</span>
          </div>
          <h1>커뮤니티</h1>
          <span onClick={() => setOpenModal(true)}>마이페이지</span>
          {openModal && (
            <Modal
              onClose={() => setOpenModal(false)}
              content={<MyInfoForm />}
            />
          )}
        </header>
      </div>
    </>
  );
}

export default SocialHeader;
