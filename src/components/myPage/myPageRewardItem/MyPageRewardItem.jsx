import './style.scss';

function MyPageRewardItem({ rewardData }) {

  return (
    <div
      className='rewardDescription'
      description={rewardData.rewardDescription}
    >
      <div className={(rewardData.active ? 'activeRewardItem' : 'inactiveRewardItem') + ' '
        + (rewardData.gold ? 'goldRewardItem' : '') + ' '
        + 'fontLight'}>
        {rewardData.rewardName}
      </div>
    </div>
  );
}

export default MyPageRewardItem;
