import { useState } from 'react';
import './style.scss';
import MyPageRewardItem from '../myPageRewardItem/MyPageRewardItem';
import icArrowLeft2 from '../../../images/svg/icArrowLeft2.svg';
import icArrowRight2 from '../../../images/svg/icArrowRight2.svg';

const initialReward = [
  {
    rewardId: 1,
    rewardName: '첫 1승',
  },
  {
    rewardId: 2,
    rewardName: '5회 연패',
  },
  // {
  //   rewardId: 3,
  //   rewardName: '승리의 기쁨',
  // },
  // {
  //   rewardId: 4,
  //   rewardName: '라이어 헌터',
  // },
  // {
  //   rewardId: 5,
  //   rewardName: '빛의 속도',
  // },
  // {
  //   rewardId: 6,
  //   rewardName: '불굴의 의지',
  // },
  // {
  //   rewardId: 7,
  //   rewardName: '신과 함께',
  // },
  // {
  //   rewardId: 8,
  //   rewardName: '999',
  // },
];

function MyPageReward({ maxPage, allReward }) {
  // 업적이 추가되면 사용하려고 가져온 로비 페이지(?) 함수
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
        <MyPageRewardItem rewardData={initialReward} />
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
