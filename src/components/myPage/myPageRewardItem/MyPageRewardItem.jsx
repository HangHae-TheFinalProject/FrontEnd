import './style.scss';

function MyPageRewardItem({ rewardData, isActive }) {

  return (
    <div
      className='rewardDescription'
      description={rewardData.rewardDescription}
    >
      <div className={(isActive ? 'activeRewardItem' : 'inactiveRewardItem') + ' '
        + (rewardData.isGold ? 'goldRewardItem' : '') + ' '
        + 'fontLight'}>
        {rewardData.rewardName}
      </div>

    </div>
  );
}

export default MyPageRewardItem;
