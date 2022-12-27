import { useEffect, useState } from 'react';
import MyPageRecord from '../myPageRecord/MyPageRecord';
import MyPageReward from '../myPageReward/MyPageReward';
import MyPageSignOff from '../myPageSignOff/MyPageSignOff';
import MyPageSignOut from '../myPageSignOut/MyPageSignOut';
import instance from '../../../shared/Request';
import myPage_ActiveBtn from '../../../images/png/myPage_ActiveBtn.png';
import myPage_InActiveBtn from '../../../images/png/myPage_InActiveBtn.png';
import { ReactComponent as CancelBtn } from '../../../images/svg/icCancel.svg';
import myPageForm from './style.module.scss';

function MyPageForm({ setOpenModal }) {
  const [active, setActive] = useState(false);
  const [recordData, setRecordData] = useState([]);
  const [rewardData, setRewardData] = useState([]);
  const [rewardPage, setRewardPage] = useState(1);

  // 전적 조회 api
  const getMyPageAllRecord = () => {
    instance.get('/lier/myinfo/allrecord').then((response) => {
      setRecordData(response.data.data);
    });
  };

  // 업적 조회 api
  const getMyPageReward = () => {
    instance.get(`/lier/myinfo/reward/${rewardPage}`).then((response) => {
      setRewardData(response.data.data.rewardsInPage);
    });
  };

  useEffect(() => {
    getMyPageAllRecord();
    getMyPageReward();
  }, []);

  return (
    <div className={myPageForm.myInfoSection}>
      {!active ? (
        <div className={myPageForm.myInfoBtnSection}>
          <span className={myPageForm.activeMyPage}>마이페이지</span>
          <span
            className={myPageForm.inActiveReward}
            onClick={() => setActive(true)}
          >
            리워드
          </span>
          <img
            className={myPageForm.activeBtn}
            src={myPage_ActiveBtn}
            alt="myPageActiveBtn"
          />
        </div>
      ) : (
        <div className={myPageForm.myInfoBtnSection}>
          <span
            className={myPageForm.inActiveMyPage}
            onClick={() => setActive(false)}
          >
            마이페이지
          </span>
          <span className={myPageForm.activeReward}>리워드</span>
          <img
            className={myPageForm.inActiveBtn}
            src={myPage_InActiveBtn}
            alt="rewardInActiveBtn"
            onClick={() => setActive(false)}
          />
        </div>
      )}
      <div className={myPageForm.myPageFrame}>
        {!active ? (
          <div className={myPageForm.myPageRecord}>
            <CancelBtn
              className={myPageForm.myPageCloseBtn}
              onClick={() => setOpenModal(false)}
            />
            <MyPageRecord allRecord={recordData} />
            <div className={myPageForm.myPageSignBtn}>
              <MyPageSignOff />
              <MyPageSignOut />
            </div>
          </div>
        ) : (
          <div className={myPageForm.myPageReward}>
            <CancelBtn
              className={myPageForm.myPageCloseBtn}
              onClick={() => setOpenModal(false)}
            />
            <MyPageReward rewardList={rewardData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPageForm;
