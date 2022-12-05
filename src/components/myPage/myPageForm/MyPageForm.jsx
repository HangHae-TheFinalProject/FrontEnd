import myPage_ActiveBtn from '../../../images/png/myPage_ActiveBtn.png';
import myPage_InActiveBtn from '../../../images/png/myPage_InActiveBtn.png';

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
  const [rewardData, setRewardData] = useState([]);

  // 전적 조회 api
  const getMyPageAllRecord = () => {
    instance.get('/lier/myinfo/allrecord').then((response) => {
      setRecordData(response.data.data);
    });
  };

  // 업적 조회 api
  const getMyPageReward = () => {
    instance.get('/lier/myinfo/reward').then((response) => {
      setRewardData(response.data.data);
    });
  };

  useEffect(() => {
    getMyPageAllRecord();
    getMyPageReward();
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
                <MyPageReward clearReward={rewardData} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MyPageForm;
