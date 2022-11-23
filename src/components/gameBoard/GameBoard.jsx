import { useSelector } from 'react-redux';
import gameBoardBackground from '../../images/svg/gameBoardBackground.svg';
import gameBoardFrame from '../../images/svg/gameBoardFrame.svg';
import './style.scss';

function GameBoard({ item, goStage6, goStage3 }) {

  let content;
  const status = useSelector(state => state.game.gameBoardStatus);

  switch (status) {
    case 'WAIT_START':
      content = <WaitStartBoard />
      break;
    case 'SHOW_KEYWORD':
      content = <ShowKeywordBoard item={item} />
      break;
    case 'SHOW_LIER':
      content = <ShowLierBoard item={item} />
      break;
    case 'VOTE_ONEMORE':
      content = <OnemoreVoteBoard goStage3={goStage3} goStage6={goStage6} />
      break;
  }

  return <div className='gameBoardSection'>
    <img src={gameBoardBackground} className='gameBoardBackground' />
    <img src={gameBoardFrame} className='gameBoardFrame' />
    <div>
      {content}
    </div>
  </div>
}

export default GameBoard;

function WaitStartBoard() {

  return <div className='stageText'>
    <span>게임을 시작하기 전입니다.</span>
  </div>

}

function ShowKeywordBoard({ item }) {

  return <div className='stageText'>
    <span>{`카테고리 : ${item.category}`}</span>
    <span>{`키워드 : ${item.keyword}`}</span>
  </div>
}

function ShowLierBoard({ item }) {

  return <div className='stageText'>
    <span>{`카테고리 : ${item.category}`}</span>
    <span>당신은 라이어입니다.</span>
  </div>
}

function OnemoreVoteBoard({ goStage3, goStage6 }) {

  return <div className='stageBtn'>
    <a href='#' onClick={goStage3}><div className='btnOnemore'>
      한바퀴 더!
    </div></a>
    <a href='#' onClick={goStage6}><div className='btnOnemore'>
      바로 투표하기
    </div></a>
  </div>
}

