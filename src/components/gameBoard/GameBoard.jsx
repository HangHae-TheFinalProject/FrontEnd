import gameBoardBackground from '../../images/svg/gameBoardBackground.svg';
import gameBoardFrame from '../../images/svg/gameBoardFrame.svg';
import './style.scss';

function GameBoard(){


  // stage componenets
  const Stage0 = () => {

    return <div className='stage0'>
      <span>게임을 시작하기 전입니다.</span>
    </div>
  }

  return <div className='gameBoardSection'>
    <img src={gameBoardBackground} className='gameBoardBackground' />
    <img src={gameBoardFrame} className='gameBoardFrame' />
    <div>
      <Stage0 />
    </div>
  </div>
}

export default GameBoard;