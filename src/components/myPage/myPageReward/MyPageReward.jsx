import { useState } from 'react';

import MyPageRewardItem from '../myPageRewardItem/MyPageRewardItem';
// import rewardList from './rewardList';

import icArrowLeft2 from '../../../images/svg/icArrowLeft2.svg';
import icArrowRight2 from '../../../images/svg/icArrowRight2.svg';

import './style.scss';

function MyPageReward({ maxPage = 1, rewardList = [] }) {
  const [page, setPage] = useState(1);

  const rewardPageUp = () => {
    if (page <= 1) return;
    setPage((p) => p - 1);
  };

  const rewardPageDown = () => {
    if (page >= maxPage) return;
    setPage((p) => p + 1);
  };

  return (
    <div className="myPageRewardContainer">
      <div onClick={rewardPageUp}>
        <div className="rewardIcArrowLeft">
          {page > 1 ? <img src={icArrowLeft2} alt="LeftButton" /> : ''}
        </div>
      </div>
      <div className="myPageRewardItemBox">
        {rewardList.map((reward) => {
          return <MyPageRewardItem key={reward.rewardId} rewardData={reward} />
        })}
      </div>
      <div onClick={rewardPageDown}>
        <div className="rewardIcArrowRight">
          {page < maxPage ? <img src={icArrowRight2} alt="RightButton" /> : ''}
        </div>
      </div>
    </div>
  );
}

export default MyPageReward;
