import { useNavigate } from 'react-router-dom';
import headerArrow from '../../images/png/headerArrow.png';

import './style.scss';
export default function RobbyHeader() {
  const navigate = useNavigate();

  return (
    <>
      <div className="headerbackground">
        <header className="headerBtnBox">
          {/* <div className="communityBox" /> */}
          <div className="communityBox">
            <img src={headerArrow} />
            <div
              type="button"
              value="커뮤니티"
              onClick={() => navigate('/social/list')}
            >
              커뮤니티
            </div>
          </div>

          <h1>로비</h1>
          <div
            type="button"
            value="마이페이지"
            onClick={() => navigate('/mypage')}
          >
            마이페이지
          </div>
        </header>
      </div>
    </>
  );
}
