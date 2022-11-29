import myPage_ActiveBtn from '../../../images/svg/myPage_ActiveBtn.svg';
import myPage_InActiveBtn from '../../../images/svg/myPage_InActiveBtn.svg';

import './style.scss';
import { useEffect, useState } from 'react';
import instance from '../../../shared/Request';
import MyPageRecord from '../myPageRecord/MyPageRecord';
import MyPageReward from '../myPageReward/MyPageReward';
import MyPageSignOff from '../myPageSignOff/MyPageSignOff';

function MyPageForm() {
  const [active, setActive] = useState(false);
  const [data, setData] = useState([]);
  console.log(data);

  const getMyPage = async () => {
    await instance
      .get('/lier/myinfo/allrecord')
      .then((response) => setData(response.data.data));
  };

  useEffect(() => {
    getMyPage();
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
                <MyPageRecord allRecord={data} />
                <MyPageSignOff />
              </div>
            </>
          ) : (
            <>
              <div className="myPageReward">
                <MyPageReward />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MyPageForm;
