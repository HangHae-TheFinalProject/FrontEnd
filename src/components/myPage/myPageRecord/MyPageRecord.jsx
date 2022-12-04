import { useState, useEffect } from 'react';
import './style.scss';

function MyPageRecord({ allRecord }) {
  const [record, setRecord] = useState(allRecord);
  const defaultPlayTimeState = '아직 플레이하지 않았습니다.';

  useEffect(() => {
    setRecord(allRecord);
  }, [allRecord]);

  return (
    <div className="myPageRecordContainer fontSemiBold">
      <div className="myPageRecordWrap">
        <div className="myPageRecordInformation">
          <div className="myPageInfoWrap">
            <span className="myPageInfoTitle">닉네임</span>
            <span className="myPageInfoContent fontBold">
              {sessionStorage.getItem('realnickname')}
            </span>
          </div>
          <div className="myPageInfoWrap">
            <span className="myPageInfoTitle">게임전적</span>
            <span className="myPageInfoContent fontBold">
              {record.allPlayRecord}
            </span>
          </div>
        </div>
        <div className="myPageRewardRecord">
          <span className="rewardTitle">보유 리워드</span>
          <span className="rewardNum fontBold">{record.rewardCnt}</span>
        </div>
        <div className="myPagePlayRecord">
          {defaultPlayTimeState === record.totalPlayTime ? (
            <>
              <span className="recordTitle">플레이 시간</span>
              <span className="recordNum fontBold">0분</span>
            </>
          ) : (
            <>
              <span className="recordTitle">플레이 시간</span>
              <span className="recordNum fontBold">{record.totalPlayTime}</span>
            </>
          )}
        </div>
        <div className="myPagePlayRecord">
          <span className="recordTitle">라이어 승리</span>
          <span className="recordNum fontBold">{record.winLIER}</span>
        </div>
        <div className="myPagePlayRecord">
          <span className="recordTitle">일반 승리</span>
          <span className="recordNum fontBold">{record.winCITIZEN}</span>
        </div>
      </div>
    </div>
  );
}

export default MyPageRecord;
