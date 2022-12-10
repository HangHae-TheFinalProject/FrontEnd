import './style.scss';

import rewardIcon from '../../images/png/rewardIcon.png';
import { useEffect } from 'react';

function RewardAlert({ item, closeAlert, showtime }) {

  useEffect(() => {

    const timeoutId = setTimeout(() => {
      closeAlert();
    }, showtime * 1000);

    return () => {
      return (
      clearTimeout(timeoutId)
      )
    };
  }, [])

  return (
    <div className='rewardAlertBox' style={{animationDuration: showtime}}>
      <div className="rewardAlertIconBox">
        <img src={rewardIcon} />
      </div>
      <div className="rewardAlertTextBox">
        <div className="rewardAlertTitle">
          {item.rewardName}
        </div>
        <div className="rewardAlertDescription">
          {item.mentation}
        </div>
      </div>
    </div>
  )
}

export default RewardAlert;

