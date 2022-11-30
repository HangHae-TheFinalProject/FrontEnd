import { useState, useEffect } from 'react';
import './style.scss';

function MyPageRecord({ allRecord }) {
  const [record, setRecord] = useState(allRecord);

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
              {record.allPlayRecord}전 {record.winNum}승 {record.lossNum}패
            </span>
          </div>
        </div>
        <div className="myPageRewardRecord">
          <span className="rewardTitle">보유 리워드</span>
          <span className="rewardNum fontBold">{}개</span>
        </div>
        <div className="myPagePlayRecord">
          <span className="recordTitle">플레이 시간</span>
          <span className="recordNum fontBold">{}시간</span>
        </div>
        <div className="myPagePlayRecord">
          <span className="recordTitle">라이어 승리</span>
          <span className="recordNum fontBold">{record.winLIER}승</span>
        </div>
        <div className="myPagePlayRecord">
          <span className="recordTitle">일반 승리</span>
          <span className="recordNum fontBold">{record.winCITIZEN}승</span>
        </div>
      </div>
    </div>
  );
}

export default MyPageRecord;
