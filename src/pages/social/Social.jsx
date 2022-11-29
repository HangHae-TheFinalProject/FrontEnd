import SocialHeader from '../../components/socialHeader/SocialHeader';
import lobbyBackGround from '../../images/png/lobbyBackGround.png';
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
      </div>
    </>
  );
}

export default Social;
