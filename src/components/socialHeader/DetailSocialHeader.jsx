import { useNavigate } from 'react-router-dom';

import headerArrow from '../../images/png/headerArrow.png';

import './style.scss';

function SocialHeader() {
  const navigate = useNavigate();

  return (
    <>
      <div className="socialHeaderBackground fontLightBold">
        <header className="socialHeader">
          <h1>커뮤니티</h1>
        </header>
        <div className="socialHeaderCommunityBox">
          <div
            className="socialHeaderCommunityBtn"
            onClick={() => navigate('/social')}
          >
            <img src={headerArrow} alt="headerArrow" />
            <span>뒤로가기</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SocialHeader;
