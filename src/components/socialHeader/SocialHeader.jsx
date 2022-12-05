import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../elements/modal/Modal';

import headerArrow from '../../images/png/headerArrow.png';
import MyPageForm from '../myPage/myPageForm/MyPageForm';

import './style.scss';

function SocialHeader() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="socialHeaderBackground fontLightBold">
        <header className="socialHeader">
          <h1>커뮤니티</h1>
        </header>
        <div className="socialHeaderCommunityBox">
          <div
            className="socialHeaderCommunityBtn"
            onClick={() => navigate('/lobby')}
          >
            <img src={headerArrow} alt="headerArrow" />
            <span>로비</span>
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

export default SocialHeader;
