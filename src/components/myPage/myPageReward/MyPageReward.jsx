import { useState } from 'react';
import MyPageRewardItem from '../myPageRewardItem/MyPageRewardItem';
import RewardLeftBtn from '../../../images/svg/icArrowLeft2.svg';
import RewardRightBtn from '../../../images/svg/icArrowRight2.svg';
import myPageReward from './style.module.scss';

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
    <div className={myPageReward.myPageRewardContainer}>
      <div onClick={rewardPageUp}>
        <div className={myPageReward.rewardIcArrowLeft}>
          {page > 1 ? <img src={RewardLeftBtn} alt="LeftButton" /> : ''}
        </div>
      </div>
      <div className={myPageReward.myPageRewardItemBox}>
        {rewardList.map((reward) => {
          return <MyPageRewardItem key={reward.rewardId} rewardData={reward} />;
        })}
      </div>
      <div onClick={rewardPageDown}>
        <div className={myPageReward.rewardIcArrowRight}>
          {page < maxPage ? <img src={RewardRightBtn} alt="RightButton" /> : ''}
        </div>
      </div>
    </div>
  );
}

export default MyPageReward;
