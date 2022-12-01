import SocialHeader from '../../components/socialHeader/SocialHeader';
import lobbyBackGround from '../../images/png/lobbyBackGround.png';

import List from './List.jsx';
import './style.scss';

function Social() {
  return (
    <>
      <div className="socialPageSection fontLightBold">
        <img
          className="socialBackGround"
          src={lobbyBackGround}
          alt="lobbyBackGround"
        />
        <SocialHeader />
        <List />
      </div>
    </>
  );
}

export default Social;
