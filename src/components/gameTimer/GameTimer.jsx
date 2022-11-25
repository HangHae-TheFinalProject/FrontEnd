import './style.scss';
import timerFrame from '../../images/svg/timerFrame.svg';
import { useState, useEffect } from 'react';

// function GameTimer({ sec, setSec }) {
function GameTimer({ timer, setTimer }) {

  // const [time, setTime] = useState();
  const [sec, setSec] = useState();

  useEffect(() => {
    setSec(timer.time);
    const intervalId = setInterval(() => {
      setSec((t) => t - 1)
    }, 1000);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId)
      setSec(-1);
      setTimer({ time: -1, status: 2 });
    }, (timer.time + 1) * 1000)

    return () => {
      return (clearInterval(intervalId),
        clearTimeout(timeoutId)
      );
    }
  // }, [timer.time])
}, [timer.time])

  return <div className='timerBox'>
    <img src={timerFrame} className='timerFrame' />
    <div className={`timerText fontSemiBold ${sec === 0 ? 'fontred' : ''}`}>{sec >= 0 ? sec : ''}</div>
  </div>
}

export default GameTimer;