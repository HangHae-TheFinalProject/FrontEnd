import { useState, useEffect } from 'react';
import myPageRecord from './style.module.scss';

function MyPageRecord({ allRecord }) {
  const [record, setRecord] = useState(allRecord);

  useEffect(() => {
    setRecord(allRecord);
  }, [allRecord]);

  return (
    <div className={myPageRecord.myPageRecordContainer}>
      <div className={myPageRecord.myPageRecordWrap}>
        <div className={myPageRecord.myPageRecordInformation}>
          <div className={myPageRecord.myPageInfoWrap}>
            <span className={myPageRecord.myPageInfoTitle}>닉네임</span>
            <span className={myPageRecord.myPageInfoContent}>
              {sessionStorage.getItem('realnickname')}
            </span>
          </div>
          <div className={myPageRecord.myPageInfoWrap}>
            <span className={myPageRecord.myPageInfoTitle}>게임전적</span>
            <span className={myPageRecord.myPageInfoContent}>
              {record.allPlayRecord}
            </span>
          </div>
        </div>
        <div className={myPageRecord.myPageRewardRecord}>
          <span className={myPageRecord.rewardTitle}>보유 리워드</span>
          <span className={myPageRecord.rewardNum}>{record.rewardCnt}</span>
        </div>
        <div className={myPageRecord.myPagePlayRecord}>
          <span className={myPageRecord.recordTitle}>플레이 시간</span>
          <span className={myPageRecord.recordNum}>{record.totalPlayTime}</span>
        </div>
        <div className={myPageRecord.myPagePlayRecord}>
          <span className={myPageRecord.recordTitle}>라이어 승리</span>
          <span className={myPageRecord.recordNum}>{record.winLIER}</span>
        </div>
        <div className={myPageRecord.myPagePlayRecord}>
          <span className={myPageRecord.recordTitle}>일반 승리</span>
          <span className={myPageRecord.recordNum}>{record.winCITIZEN}</span>
        </div>
      </div>
    </div>
  );
}

export default MyPageRecord;
