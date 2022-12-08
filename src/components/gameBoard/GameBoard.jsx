import { useSelector } from 'react-redux';
import gameBoardFrame from '../../images/svg/gameBoardFrame.svg';
import './style.scss';

function GameBoard({ item, poorItem={}, govote, onemorevote, gameboardStatus }) {
  let content;
  // const status = useSelector((state) => state.game.gameBoardStatus);
  // const gamemode = useSelector((state) => state.rooms.room.mode);

  switch (gameboardStatus) {
    case 'WAIT_START':
      content = <WaitStartBoard />;
      break;
    case 'SHOW_KEYWORD':
      content = <ShowKeywordBoard item={item} />;
      break;
    case 'SHOW_LIER':
      if(poorItem !== {} ){
        content = <ShowLierBoard item={item} />;
      } else {
        content = <ShowKeywordBoard item={poorItem} />;
      }
      break;
    case 'VOTE_ONEMORE':
      content = <OnemoreVoteBoard onemorevote={onemorevote} govote={govote} />;
      break;
  }

  return (
    <div className="gameBoardSection">
      <img
        src={gameBoardFrame}
        alt="gameBoardFrame"
        className="gameBoardFrame"
      />
      <div>{content}</div>
    </div>
  );
}

export default GameBoard;

function WaitStartBoard() {
  return (
    <div className="stageReadyText fontLightBold">
      <span>게임을 준비해주세요.</span>
    </div>
  );
}

function ShowKeywordBoard({ item }) {
  return (
    <div className="stagePlayText fontLightBold">
      <span className="stagePlayCategory">{`카테고리 : ${item.category}`}</span>
      <span className="stagePlayMission">{`키워드 : ${item.keyword}`}</span>
    </div>
  );
}

function ShowLierBoard({ item }) {
  return (
    <div className="stagePlayText fontLightBold">
      <span className="stagePlayCategory">{`카테고리 : ${item.category}`}</span>
      <span className="stagePlayMission">당신은 라이어입니다.</span>
    </div>
  );
}

function OnemoreVoteBoard({ onemorevote, govote }) {
  return (
    <div className="stageBtn fontLightBold">
      <a href="#" onClick={onemorevote}>
        <div className="btnOnemore">한바퀴 더!</div>
      </a>
      <a href="#" onClick={govote}>
        <div className="btnOnemore">바로 투표하기</div>
      </a>
    </div>
  );
}
