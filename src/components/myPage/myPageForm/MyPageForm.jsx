import myPage_ActiveBtn from '../../../images/svg/myPage_ActiveBtn.svg';
import myPage_InActiveBtn from '../../../images/svg/myPage_InActiveBtn.svg';

import './style.scss';
import { useEffect, useState } from 'react';
import instance from '../../../shared/Request';
import MyPageRecord from '../myPageRecord/MyPageRecord';
import MyPageReward from '../myPageReward/MyPageReward';
import MyPageSignOff from '../myPageSignOff/MyPageSignOff';
import MyPageSignOut from '../myPageSignOut/MyPageSignOut';

function MyPageForm() {
  const [active, setActive] = useState(false);
  const [recordData, setRecordData] = useState([]);
  // 업적 데이터 담을 state
  const [rewardData, setRewardData] = useState([]);

  // 전적 조회 api
  const getMyPageAllRecord = () => {
    instance
      .get('/lier/myinfo/allrecord')
      .then((response) => setRecordData(response.data.data));
  };

  // 업적 조회 api
  const getMyPageReward = () => {
    instance.get('/lier/myinfo/reward').then((response) => {
      console.log(response);
      // 업적 데이터 담으면 됨
      setRecordData();
    });
  };

  useEffect(() => {
    getMyPageAllRecord();
    // getMyPageReward();
  }, []);

  return (
    <>
      <div className="myInfoSection fontLightBold">
        {!active ? (
          <>
            <div className="myInfoBtnSection">
              <span className="activeMyPage">마이페이지</span>
              <span className="inActiveReward" onClick={() => setActive(true)}>
                리워드
              </span>
              <img
                className="activeBtn"
                src={myPage_ActiveBtn}
                alt="myPageActiveBtn"
              />
            </div>
          </>
        ) : (
          <>
            <div className="myInfoBtnSection">
              <span className="inActiveMyPage" onClick={() => setActive(false)}>
                마이페이지
              </span>
              <span className="activeReward">리워드</span>
              <img
                className="inActiveBtn"
                src={myPage_InActiveBtn}
                alt="rewardInActiveBtn"
                onClick={() => setActive(false)}
              />
            </div>
          </>
        )}
        <div className="myPageFrame">
          {!active ? (
            <>
              <div className="myPageRecord">
                <MyPageRecord allRecord={recordData} />
                <div className="myPageSignBtn">
                  <MyPageSignOff />
                  <MyPageSignOut />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="myPageReward">
                <MyPageReward allReward={rewardData} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MyPageForm;
