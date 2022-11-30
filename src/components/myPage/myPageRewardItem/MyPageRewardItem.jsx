import './style.scss';
import activeAlongWithTheGods from '../../../images/svg/activeAlongWithTheGods.svg';
import inActiveAlongWithTheGods from '../../../images/svg/inActiveAlongWithTheGods.svg';
import activeFirstWin from '../../../images/svg/activeFirstWin.svg';
import inActiveFirstWin from '../../../images/svg/inActiveFirstWin.svg';
import activeFiveSerialLose from '../../../images/svg/activeFiveSerialLose.svg';
import inActiveFiveSerialLose from '../../../images/svg/inActiveFiveSerialLose.svg';
import activeFortitude from '../../../images/svg/activeFortitude.svg';
import inActiveFortitude from '../../../images/svg/inActiveFortitude.svg';
import activeJoyOfWin from '../../../images/svg/activeJoyOfWin.svg';
import inActiveJoyOfWin from '../../../images/svg/inActiveJoyOfWin.svg';
import activeLierHunter from '../../../images/svg/activeLierHunter.svg';
import inActiveLierHunter from '../../../images/svg/inActiveLierHunter.svg';
import activeSpeedOfLight from '../../../images/svg/activeSpeedOfLight.svg';
import inActiveSpeedOfLight from '../../../images/svg/inActiveSpeedOfLight.svg';
import activeTripleNine from '../../../images/svg/activeTripleNine.svg';
import inActiveTripleNine from '../../../images/svg/inActiveTripleNine.svg';
import { useEffect, useState } from 'react';

function MyPageRewardItem({ rewardData }) {
  const [reward, setReward] = useState(rewardData);

  console.log(reward);

  useEffect(() => {
    console.log('useEffect');
    setReward(reward);
  }, [reward]);

  return (
    <>
      <div
        className="activeItem"
        description="시민 또는 라이어로 첫 1승시 획득"
      >
        {reward.rewardId === 1 ? (
          <img src={activeFirstWin} alt="첫 1승" />
        ) : (
          <img src={inActiveFirstWin} alt="첫 1승" />
        )}
      </div>
      <div className="activeItem" description="5회 연패시 획득">
        {reward.rewardId === 2 ? (
          <img src={activeFiveSerialLose} alt="5회 연패" />
        ) : (
          <img src={inActiveFiveSerialLose} alt="5회 연패" />
        )}
      </div>
      <div
        className="activeItem"
        description="시민 또는 라이어로 총 10회 승리 시 획득"
      >
        {reward.rewardId === 3 ? (
          <img src={activeJoyOfWin} alt="승리의 기쁨" />
        ) : (
          <img src={inActiveJoyOfWin} alt="승리의 기쁨" />
        )}
      </div>
      <div className="activeItem" description="시민으로 10번 승리 시 획득">
        {reward.rewardId === 4 ? (
          <img src={activeLierHunter} alt="라이어 헌터" />
        ) : (
          <img src={inActiveLierHunter} alt="라이어 헌터" />
        )}
      </div>
      <div
        className="activeItem"
        description="1라운드 이내 라이어로 승리 후 시민으로 승리 시 획득"
      >
        {reward.rewardId === 5 ? (
          <img src={activeSpeedOfLight} alt="빛의 속도" />
        ) : (
          <img src={inActiveSpeedOfLight} alt="빛의 속도" />
        )}
      </div>
      <div
        className="activeItem"
        description="4회 승리, 12회 이상 패비 시 획득"
      >
        {reward.rewardId === 6 ? (
          <img src={activeFortitude} alt="불굴의 의지" />
        ) : (
          <img src={inActiveFortitude} alt="불굴의 의지" />
        )}
      </div>
      <div
        className="activeItem"
        description="라이어로서 정답을 맞춰 10회 승리 시 획득"
      >
        {reward.rewardId === 7 ? (
          <img src={activeAlongWithTheGods} alt="신과 함꼐" />
        ) : (
          <img src={inActiveAlongWithTheGods} alt="신과 함꼐" />
        )}
      </div>
      <div
        className="activeItem"
        description="9번 이상 플레이, 9번 승리, 9번 패배 시 획득"
      >
        {reward.rewardId === 8 ? (
          <img src={activeTripleNine} alt="999" />
        ) : (
          <img src={inActiveTripleNine} alt="999" />
        )}
      </div>
    </>
  );
}

export default MyPageRewardItem;
