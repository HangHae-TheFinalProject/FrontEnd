import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../elements/modal/Modal';
import MyPageForm from '../myPage/myPageForm/MyPageForm';
import GameRuleBoard from '../gameRuleBoard/GameRuleBoard';
import SettingBoard from '../setting/SettingBoard';

import headerArrow from '../../images/png/headerArrow.png';
import { ReactComponent as BtnCircle } from '../../images/svg/btnCircle.svg';
import { ReactComponent as BtnQuestion } from '../../images/svg/icQuestion.svg';

import './style.scss';

function LobbyHeader() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const [openGameRuleModal, setOpenGameRuleModal] = useState(false);

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
              content={<MyPageForm setOpenModal={setOpenModal} />}
            />
          )}
          {/* {openSettingModal && (
            <Modal
              onClose={() => setOpenSettingModal(false)}
              content={
                <SettingBoard setOpenSettingModal={setOpenSettingModal} />
              }
            />
          )} */}
          {openGameRuleModal && (
            <Modal
              onClose={() => setOpenGameRuleModal(false)}
              content={
                <GameRuleBoard setOpenGameRuleModal={setOpenGameRuleModal} />
              }
            />
          )}
          <div className="lobbyHeaderBtn">
            <span onClick={() => setOpenModal(true)}>마이페이지</span>
            <div
              className="gameRuleBtn"
              onClick={() => setOpenGameRuleModal(true)}
            >
              <BtnQuestion />
            </div>
            <div className="settingBtn">
              <BtnCircle onClick={() => alert('배경음악 준비 중이에요.')} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LobbyHeader;
