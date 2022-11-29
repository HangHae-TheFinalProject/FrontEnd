import { useState } from 'react';
import './style.scss';

function MyPageRecord({ allRecord }) {
  const [record, setRecord] = useState(allRecord);

  console.log('전적', record);
  return (
    <>
      <div className="myPageRecordContainer fontSemiBold">
        <div className="myPageInformation">
          <span className="InfoNameTitle">닉네임</span>
          <span className="InfoMyName">
            {sessionStorage.getItem('realnickname')}
          </span>
        </div>
        <span className="myPageRecordTable">게임전적</span>
        <div className="myPageRecordWrap">
          <span className="recordTitle">전체</span>
          <span className="recordNum">{record.allPlayRecord}전</span>
          <span className="recordNum">{record.winNum}승</span>
          <span className="recordNum">{record.lossNum}패</span>
        </div>

        <div className="myPageRecordWrap">
          <span className="recordTitle">라이어</span>
          <span className="recordNum">{record.allLierPlayRecord}전</span>
          <span className="recordNum">{record.winLIER}승</span>
          <span className="recordNum">{record.loseLIER}패</span>
        </div>

        <div className="myPageRecordWrap">
          <span className="recordTitle">일반</span>
          <span className="recordNum">{record.allCitizenPlayRecord}전</span>
          <span className="recordNum">{record.winCITIZEN}승</span>
          <span className="recordNum">{record.loseCITIZEN}패</span>
        </div>
      </div>
    </>
  );
}

export default MyPageRecord;
