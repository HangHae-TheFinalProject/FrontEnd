import './style.scss';
import timerFrame from '../../images/svg/timerFrame.svg';
import { useState, useEffect } from 'react';

function GameTimer({ sec, setSec }) {

  const [time, setTime] = useState();

  useEffect(() => {
    setTime(sec.time);
    const intervalId = setInterval(() => {
      setTime((t) => t - 1)
    }, 1000);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId)
      setTime(-1);
      setSec({time: -1, status: 2});
    }, (sec.time + 1) * 1000)

    return () => {
      return (clearInterval(intervalId),
        clearTimeout(timeoutId)
      );
    }
  }, [sec.time])

  return <div className='timerBox'>
    <img src={timerFrame} className='timerFrame' />
    <div className={`timerText fontSemiBold ${time === 0 ? 'fontred' : ''}`}>{time >= 0 ? time : ''}</div>
  </div>
}

export default GameTimer;