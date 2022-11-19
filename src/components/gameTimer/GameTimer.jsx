import './style.scss';
import timerFrame from '../../images/svg/timerFrame.svg';

function GameTimer() {


  return <div className='timerBox'>
    <img src={timerFrame} className='timerFrame'/>
    <div className='timerText fontSemiBold'>15</div>
  </div>
}

export default GameTimer;