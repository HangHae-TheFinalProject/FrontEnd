import myPageRewardItem from './style.module.scss';

function MyPageRewardItem({ rewardData }) {
  return (
    <div
      className={myPageRewardItem.rewardDescription}
      description={rewardData.rewardDescription}
    >
      <div
        className={
          (rewardData.active
            ? `${myPageRewardItem.activeRewardItem}`
            : `${myPageRewardItem.inactiveRewardItem}`) +
          ' ' +
          (rewardData.gold ? `${myPageRewardItem.goldRewardItem}` : '') +
          ' '
        }
      >
        {rewardData.rewardName}
      </div>
    </div>
  );
}

export default MyPageRewardItem;
