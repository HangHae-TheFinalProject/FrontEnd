import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useInput from '../../hooks/useInput';

// style
import './style.scss';

import inGameLabelInActive from '../../images/svg/inGameLabelInActive.svg';
import inGameLabelActive from '../../images/svg/inGameLabelActive.svg';

function GamePopup({ closePopup, round, isAnswer, liarVote }) {
  let content;
  const status = useSelector((state) => state.game.popupStatus);

  switch (status) {
    case 'LIER_VOTE':
      content = <VotePopup closePopup={closePopup} liarVote={liarVote} />;
      break;
    case 'VOTE_RESULT':
      content = <VoteResultPopup closePopup={closePopup} />;
      break;
    case 'DRAW':
      content = <VoteDrawPopup closePopup={closePopup} round={round} />;
      break;
    case 'DRAW_AND_ENDGAME':
      content = <VoteDrawEndPopup closePopup={closePopup} />;
      break;
    case 'LIER_LIER':
      content = (
        <ResultLierLierPopup closePopup={closePopup} isAnswer={isAnswer} />
      );
      break;
    case 'LIER_USER':
      content = <ResultLierUserPopup closePopup={closePopup} />;
      break;
    case 'NLIER':
      content = <ResultNLierPopup closePopup={closePopup} />;
      break;
    case 'VICTORY_USER':
      content = <VictoryUserPopup closePopup={closePopup} />;
      break;
    case 'VICTORY_LIER':
      content = <VictoryLierPopup closePopup={closePopup} />;
      break;
  }

  return (
    <div className="gamePopup fontLightBold">
      <div className="popupContent">{content}</div>
    </div>
  );
}

export default GamePopup;

const VotePopup = ({ closePopup, liarVote }) => {
  const memberlist = useSelector((state) => state.game.memberList) || [];
  const keys = [0, 1, 2, 3, 4, 5, 6, 7];
  const [voteMember, setVoteMember] = useState();

  const voteHandler = (nickname) => {
    if (voteMember) return;
    liarVote(nickname);
    setVoteMember(nickname);
  };

  return (
    <>
      <div className="popupTitleBox">
        <span className="popupPlayState">당신이 생각하는 라이어는?</span>
        <div className="inGamePlayerSelect">
          {memberlist.map((member, index) => {
            return (
              <figure
                key={keys[index]}
                onClick={() => {
                  voteHandler(member);
                }}
                className={`${
                  voteMember ? 'inactiveVoteBox' : 'inGamePlayer'
                } ${member === voteMember ? 'highlightVoteBox' : ''}`}
              >
                <img
                  src={inGameLabelInActive}
                  alt="inGameLabel"
                  className="inGameLabel"
                />
                <figcaption className="inGameNickname">
                  {member.replace(/#\d*/, '')}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </>
  );
};

const VoteResultPopup = ({ closePopup }) => {
  const result = useSelector((state) => state.game.memberVoteResult);

  return (
    <>
      <div className="popupTitleBox">
        <span className="popupPlayState">
          과연 '{result.replace(/#\d*/, '')}' 의 정체는!?
        </span>
        <figure className="GameResult">
          <img
            src={inGameLabelActive}
            alt="resultLabel"
            className="resultLabel"
          />
          <figcaption className="resultNickname">
            {result.replace(/#\d*/, '')}
          </figcaption>
        </figure>
      </div>
    </>
  );
};

const VoteDrawPopup = ({ closePopup, round }) => {
  const MAX_ROUND = 3;

  return (
    <>
      <div className="popupTitleBox">
        <span>라이어를 찾아내지 못했습니다.</span>
        <span>{`앞으로 남은 라운드는 ${MAX_ROUND - round}라운드 입니다.`}</span>
      </div>
    </>
  );
};

const VoteDrawEndPopup = ({ closePopup }) => {
  return (
    <>
      <div className="popupTitleBox">
        <span>투표 결과.. 동점입니다.</span>
        <span>모든 라운드가 종료되어 라이어의 승리입니다.</span>
      </div>
    </>
  );
};

const ResultLierLierPopup = ({ closePopup, isAnswer }) => {
  const [value, handler] = useInput();

  return (
    <>
      <div className="popupTitleBox">
        <span className="popupPlayState">라이어로 지목된 당신의 키워드는?</span>
        <div className="inputBox">
          <input
            typt="text"
            onChange={handler}
            className="inputKeyword"
            placeholder="키워드를 입력해 주세요."
          />
          <input
            type="button"
            value="입력"
            onClick={() => {
              isAnswer(value);
            }}
            className="btnInputKeyword"
          />
        </div>
      </div>
    </>
  );
};

const ResultLierUserPopup = ({ closePopup }) => {
  const result = useSelector((state) => state.game.memberVoteResult);

  return (
    <>
      <div className="popupTitleBox">
        <span>{result.replace(/#\d*/, '')}은(는) 라이어가 맞습니다.</span>
        <span>라이어가 키워드를 입력하고 있습니다.</span>
      </div>
    </>
  );
};

const ResultNLierPopup = ({ closePopup }) => {
  const result = useSelector((state) => state.game.memberVoteResult);

  return (
    <>
      <div className="popupTitleBox">
        <span>{result.replace(/#\d*/, '')}은(는) 라이어가 아니었습니다...</span>
      </div>
    </>
  );
};

const VictoryUserPopup = ({ closePopup }) => {
  const memberlist = useSelector((state) => state.game.memberList) || [];
  const lierNickname = useSelector((state) => state.game.memberLier);
  const keys = [0, 1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    console.log(lierNickname);
  }, [lierNickname]);
  return (
    <>
      <div className="popupTitleBox">
        <span className="popupPlayState">참가자들의 승리!</span>
        <div className="VictoryPlayerList">
          {memberlist.map((member, index) => {
            if (member !== lierNickname) {
              return (
                <figure key={keys[index]} className="inGameVictoryPlayer">
                  <img
                    src={inGameLabelActive}
                    alt="inGameLabel"
                    className="inGameLabel"
                  />
                  <figcaption className="inGameNickname">
                    {member.replace(/#\d*/, '')}
                  </figcaption>
                </figure>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

const VictoryLierPopup = ({ closePopup }) => {
  const memberLier = useSelector((state) => state.game.memberLier);

  return (
    <>
      <div className="popupTitleBox">
        <span className="popupPlayState">라이어의 승리!</span>
        <figure className="GameResult">
          <img
            src={inGameLabelActive}
            alt="resultLabel"
            className="resultLabel"
          />

          <figcaption className="resultNickname">
            {memberLier.replace(/#\d*/, '')}
          </figcaption>
        </figure>
      </div>
    </>
  );
};
