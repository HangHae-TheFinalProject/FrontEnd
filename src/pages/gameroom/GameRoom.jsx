import { useParams } from 'react-router-dom';
import VideoRoomComponent from '../../components/videoroom/components/VideoRoomComponent';
import './style.scss';
import { useEffect, useState } from 'react';
import instance from '../../shared/Request';
import GameBoard from '../../components/gameBoard/GameBoard';
import gameRoomBackground from '../../images/png/gameRoomBackground.png';
import GameTimer from '../../components/gameTimer/GameTimer';
import btnGameStart from '../../images/png/btnGameStart.png';
import Chat from '../../components/chat/Chat';
import { useNavigate } from 'react-router-dom';

function GameRoom() {
  const { id } = useParams();
  const [stageNumber, setStageNumber] = useState(0);
  const [muted, setMuted] = useState(false);
  const navigate = useNavigate();

  const leaveRoom = async () => {
    try {
      instance.delete(`/lier/room/${Number(id)}/exit`);
    } catch (error) {
      alert(error.data.message);
    }
    navigate('/lobby');
  }
  // Need to : 뒤로가기 예외처리

  const enterRoom = async () => {
    try{
      const { data } = await instance.post(`/lier/room/${Number(id)}`);
      console.log(data);
      // need to : Redux
    } catch(error){
      alert(error.data.statusMsg);
    }
  }

  useEffect(() => {
    enterRoom();
    
    return () => {
      // console.log('____Cleanup');
      // leaveRoom();
    };
  }, [])

  return (
    <div className="section">
      <img src={gameRoomBackground} className='background' />
      <div className='gameRoomSection'>
        <div className='headerSection'>
          <a href="#" onClick={leaveRoom}><div className='headerBox'>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="34" fill="none"><path fill="#D9D9D9" stroke="gray" strokeWidth="2" d="M2 17 25 1 10.712 17 25 33 2 17Z" /></svg>
            방 나가기
          </div></a>
          <div className='headerBox'>
            <GameTimer />
          </div>
          <div className='headerBox'>
            <a href='#'>
              <div className='btncircle'>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="28" fill="none"><path fill="#fff" fillOpacity=".7" d="M10.272.947a13.32 13.32 0 0 1 5.455-.003 5.323 5.323 0 0 0 2.607 3.816 5.324 5.324 0 0 0 4.61.348 13.322 13.322 0 0 1 2.723 4.727 5.325 5.325 0 0 0-2 4.165c0 1.685.781 3.188 2.003 4.165a13.39 13.39 0 0 1-2.728 4.724 5.324 5.324 0 0 0-4.608.348 5.325 5.325 0 0 0-2.606 3.814c-1.798.378-3.655.38-5.454.005a5.325 5.325 0 0 0-2.607-3.82 5.323 5.323 0 0 0-4.61-.347 13.321 13.321 0 0 1-2.723-4.728 5.325 5.325 0 0 0 2-4.162A5.324 5.324 0 0 0 .33 9.833 13.39 13.39 0 0 1 3.06 5.11a5.324 5.324 0 0 0 4.608-.348A5.324 5.324 0 0 0 10.272.948V.947ZM13 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" /></svg>
              </div>
            </a>
          </div>
        </div>
        <div className="bodySection">
          <div className='videoSection'>
            <VideoRoomComponent openviduServerUrl='https://cheiks.shop' sessionName={id} isMute={muted}/>
          </div>
          <div className='boardSection'>
            <div className="gameBoard">
              <GameBoard />
            </div>
            <div className="chatBoard">
              <Chat id={id} />
            </div>
            <a href='#' onClick={() => { }}><img src={btnGameStart} /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameRoom;
