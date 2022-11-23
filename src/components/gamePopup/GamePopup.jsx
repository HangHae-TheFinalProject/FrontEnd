import './style.scss';
import useInput from '../../hooks/useInput';
import { useSelector } from 'react-redux';

function GamePopup({ closePopup, round, isAnswer, liarVote }) {

  let content;
  const status = useSelector(state => state.game.popupStatus);

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
    case 'DRAWANDENDGAME':
      content = <VoteDrawEndPopup closePopup={closePopup} />;
      break;
    case 'LIER_LIER':
      content = <ResultLierLierPopup closePopup={closePopup} isAnswer={isAnswer} />;
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
    <div className='gamePopup fontLight'>
      <div className='popupContent' >
        {content}
      </div>
    </div>
  )
}

export default GamePopup;

const VotePopup = ({ closePopup, liarVote }) => {

  const memberlist = useSelector(state => state.game.memberList) || [];
  const keys = [0, 1, 2, 3, 4, 5, 6, 7];
  const voteHandler = (event) => {
    console.log(event);
    // liarVote(nickname)
  }

  return <>
    <div className='popupTitleBox'>
      <h3>당신이 생각하는 라이어는?</h3>
      <a href='#' onClick={closePopup}>H</a>
    </div>
    <div className='contentBox'>
      {memberlist.map((member, index) => {
        return <a href='#' key={keys[index]} onClick={() => { liarVote(member) }}>
          <h1>{member}
          </h1>
        </a>
      })}
      {/* <a href='#' onClick={voteHandler} value='nicndf'>ninkname</a> */}

    </div>
  </>
}


const VoteResultPopup = ({ closePopup }) => {
  const result = useSelector(state => state.game.memberVoteResult)
  return <>
    <div className='popupTitleBox'>
      <h3>투표완료!</h3>
      <h3>{result}의 정체는!?</h3>
      <a href='#' onClick={closePopup}>H</a>
    </div>
    <div className='contentBox'>
    </div>
  </>
}

const VoteDrawPopup = ({ closePopup, round }) => {

  const MAX_ROUND = 3;
  return <>
    <h3>한 명의 라이어를 찾아내지 못했습니다.</h3>
    <h3>{`앞으로 ${MAX_ROUND - round}라운드 남았습니다.`}</h3>
  </>
}

const VoteDrawEndPopup = ({ closePopup }) => {

  return <>
    <h3>동점입니다.</h3>
    <h3>모든 라운드가 종료되어 라이어의 승리입니다.</h3>
  </>
}

const ResultLierUserPopup = ({ closePopup }) => {
  const result = useSelector(state => state.game.memberVoteResult);

  return <>
    <h3>{result}은(는) 라이어가 맞습니다.</h3>
    <h3>라이어가 키워드를 입력하고 있습니다.</h3>
  </>
}

const ResultLierLierPopup = ({ closePopup, isAnswer }) => {

  const [value, handler] = useInput();

  return <>
    <h2>라이어로 지목된 당신의 키워드는?</h2>
    <div className='inputBox'>
      <input typt='text' onChange={handler} className='inputKeyword' placeholder='키워드를 입력해 주세요.' />
      <input type='button' value='확인' onClick={() => { isAnswer(value) }} className='btnInputKeyword' />
    </div>
  </>
}

const ResultNLierPopup = ({ closePopup }) => {
  const result = useSelector(state => state.game.memberVoteResult);

  return <>
    <div className='popupTitleBox'>
      <h3>{result}은(는) 라이어가 아니었습니다.</h3>
      <a href='#' onClick={closePopup}>H</a>
    </div>
    <div className='contentBox'>
    </div>
  </>
}

const VictoryUserPopup = ({ closePopup }) => {

  return <>
    <div className='popupTitleBox'>
      <h3>참가자들의 승리!</h3>
      <a href='#' onClick={closePopup}>H</a>
    </div>
    <div className='contentBox'>
    </div>
  </>
}

const VictoryLierPopup = ({ closePopup }) => {

  return <>
    <div className='popupTitleBox'>
      <h3>라이어의 승리!</h3>
      <a href='#' onClick={closePopup}>H</a>
    </div>
    <div className='contentBox'>
    </div>
  </>
}