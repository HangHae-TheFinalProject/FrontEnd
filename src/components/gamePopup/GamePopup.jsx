import './style.scss';
import popupBackground from '../../images/png/popupBackground.png';

function GamePopup({closePopup}) {

  return <div className='gamePopup'>
    {/* <img src={popupBackground} className='popupImage' /> */}
    <div className='popupContent' >
      <VotePopup />
    </div>
  </div>

}

export default GamePopup;

const VotePopup = () => {

  return <>
    <div className='popupTitleBox'>
      <h3>당신이 생각하는 라이어는?</h3>
    </div>
    <div className='liarVoteBox'>
    </div>
  </>
}

const VoteResultPopup = () => {

  return <>
    <div className='popupTitleBox'>
      <h3>참가자 1의 정체는?</h3>
    </div>

    <div className='liarVoteBox'>
    </div>
  </>
}