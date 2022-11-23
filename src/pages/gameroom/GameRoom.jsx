// -------------------------------------------------
// 내일은 투표부터
// -------------------------------------------------



import { useParams } from 'react-router-dom';
import VideoRoomComponent from '../../components/videoroom/components/VideoRoomComponent';
import './style.scss';
import { useEffect, useState, version } from 'react';
import instance from '../../shared/Request';
import GameBoard from '../../components/gameBoard/GameBoard';
import gameRoomBackground from '../../images/png/gameRoomBackground.png';
import GameTimer from '../../components/gameTimer/GameTimer';
import Chat from '../../components/chat/Chat';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GamePopup from '../../components/gamePopup/GamePopup';
import { useDispatch, useSelector } from 'react-redux';
import { setSpotlightMember, setStage, setPopupStatus, setGameBoardStatus, setMemberList, setMemberVoteResult } from '../../redux/modules/gameSlice';

// Sock
import * as SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { useCookies } from 'react-cookie';

// image
import btnStart from '../../images/png/btnStart.png';
import btnStartInert from '../../images/png/btnStartInert.png';
import btnReady from '../../images/png/btnReady.png';
import btnReadyInert from '../../images/png/btnReadyInert.png';
import btnExit from '../../images/png/btnExit.png';

function GameRoom() {
  const { id } = useParams();
  const [stageNumber, setStageNumber] = useState(0);
  const [muted, setMuted] = useState(false);
  const nickname = sessionStorage.getItem('nickname');
  const dispatch = useDispatch();


  const [round, setRound] = useState(0);

  // Timer status : 0 대기 1 시작 2 종료
  const [timer, setTimer] = useState({ time: -1, status: 0 });

  // statusSpotlight : 0 대기 1 내 차례 2 다른 사람 차례
  const [statusSpotlight, setStatusSpotlight] = useState(0)
  const [resultStatus, setResultStatus] = useState('');

  const [item, setItem] = useState({ category: '', keyword: '' });
  const [isPop, setIsPop] = useState(false);
  const navigate = useNavigate();
  const [cookie] = useCookies();

  const [isMaster, setIsMaster] = useState(useSelector(state => state.rooms.room.owner) === sessionStorage.getItem('nickname'));
  const [isLiar, setIsLiar] = useState(true);

  const closePopup = () => { setIsPop(false); }

  const leaveRoom = async () => {
    console.log('leaveRoom');
    try {
      instance.delete(`/lier/room/${Number(id)}/exit`);
    } catch (error) {
      alert(error.data.message);
    }
    navigate('/lobby');
  }
  // Need to : 뒤로가기 예외처리
  const enterRoom = async () => {
    try {
      const { data } = await instance.post(`/lier/room/${Number(id)}`);
      console.log(data);
      // need to : Redux
    } catch (error) {
      alert(error.data.statusMsg);
    }
  }

  const muteLocalMike = () => {
    setMuted(state => !state);
  }

  // Sock
  const client = useRef({});

  const connectHeaders = {
    'Authorization': cookie['access_token'],
    'Refresh-Token': cookie['refresh_token']
  };

  const connect = () => {
    console.log('connect')
    console.log(connectHeaders);
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJs('https://haetae.shop/ws-stomp'),
      connectHeaders,
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.log(`Broker reported error: ${frame.headers['message']}`);
        console.log(`Additional details: ${frame.body}`);
      },
    });
    client.current.activate();
  };

  // stomp 연결 취소
  const disconnect = () => {
    console.log('disconnect');
    client.current.deactivate();
  };

  // stomp 구독
  const subscribe = () => {
    console.log('subscribe')
    client.current.subscribe(
      `/sub/gameroom/${id}`,
      ({ body }) => {
        const data = JSON.parse(body)
        console.log(data);

        switch (data.type) {
          case 'START':
            setStageNumber(1);
            setItem({ category: data.content.category, keyword: data.content.keyword });
            setIsLiar(nickname === data.content.lier);
            dispatch(setMemberList(data.content.memberlist));
            break;
          case 'ALLREADY':
            setStageNumber(3);
            break;
          case 'SPOTLIGHT':
            dispatch(setSpotlightMember(data.sender));
            if (data.sender === nickname) {
              setStatusSpotlight(1);
              setMuted(true);
            } else {
              setStatusSpotlight(2);
            }
            setTimer({ time: 15, status: 1 });
            break;
          case 'COMPLETE':
            setStageNumber(5);
            setRound(data.content.round);
            setStatusSpotlight(0);
            break;
          case 'ALLCOMPLETE':
            setStageNumber(6);
            setGameBoardStatus('');
            break;
          case 'VOTE':
            setStageNumber(6);
            break;
          case 'ONEMOREROUND':
            setStageNumber(3);
            break;
          case 'LIER':
            setStageNumber(7)
            // 시민 : 라이어가 맞습니다 / 라이어 : 키워드 입력
            dispatch(setMemberVoteResult(data.content[0]));
            setResultStatus('LIER');
            dispatch(setGameBoardStatus(''));
            dispatch(setPopupStatus('VOTE_RESULT'));
            setIsPop(true);

            setTimer({ time: 3, status: 1 });

            break;
          case 'NLIER':
            setStageNumber(7)
            // 시민/라이어 : 라이어가 아닙니다.
            dispatch(setMemberVoteResult(data.content[0]));
            setResultStatus('NLIER');
            dispatch(setGameBoardStatus(''));
            dispatch(setPopupStatus('VOTE_RESULT'));
            setIsPop(true);

            setTimer({ time: 3, status: 1 });
            break;
          case 'DRAW':
            setStageNumber(3)
            setResultStatus('DRAW');
            dispatch(setPopupStatus('DRAW'));
            dispatch(setGameBoardStatus(''));
            setIsPop(true);

            break;
          case 'DRAWANDENDGAME':
            setStageNumber(7)
            setResultStatus('DRAWANDENDGAME');
            setIsPop(true);
            dispatch(setPopupStatus('DRAWANDENDGAME'));
            setGameBoardStatus('');

            setTimer({ time: 3, status: 1 });
            break;
          case 'RESULT':
            if (data.content) {
              setStageNumber(9);
              setResultStatus('WIN_LIER');
              setIsPop(true);
              dispatch(setPopupStatus('VICTORY_LIER'));
            } else {
              setStageNumber(9);
              setIsPop(true);
              setResultStatus('WIN_USER');
              dispatch(setPopupStatus('VICTORY_USER'));
            }
            break;
        }
      }
    );
  };

  // to Server : 난 방장이고 게임시작을 눌렀어.
  const gameStart = (message) => {
    console.log('gameStart');

    if (!client.current.connected) return;

    client.current.publish({
      destination: `/pub/lier/game/${id}/start`,
      body: JSON.stringify({
        type: 'START',
        roomId: id,
        sender: sessionStorage.getItem('nickname'),
        senderId: '',
        content: 'Game Start',
      }),
    });
  };

  const gameReady = () => {
    console.log('gameReady');

    if (!client.current.connected) return;

    client.current.publish({
      destination: `/pub/lier/game/${id}/ready`,
      body: JSON.stringify({
        type: 'READY',
        roomId: id,
        sender: sessionStorage.getItem('nickname'),
        senderId: '',
        content: '게임 준비되었습니다.',
      }),
    });

    setStageNumber(2)
  }

  // to Server : 내 spotlight 시간 끝났어. 시작받고 15초후에 쏜다.
  const spotlight = (sender) => {
    console.log('spotlight');

    if (!client.current.connected) return;

    client.current.publish({
      destination: `/pub/lier/game/${id}/spotlight`,
    });
  }


  const onemorevote = () => {
    console.log('onemorevote', nickname);
    if (!client.current.connected) return;

    client.current.publish({
      destination: `/pub/lier/game/${id}/roundorvote`,
      body: JSON.stringify({
        roomId: id,
        sender: nickname,
        type: "VOTE"
      }),
    });
  }

  const govote = () => {
    console.log('onemorevote', nickname);
    if (!client.current.connected) return;

    client.current.publish({
      destination: `/pub/lier/game/${id}/roundorvote`,
      body: JSON.stringify({
        roomId: id,
        sender: nickname,
        type: "ONEMOREROUND"
      }),
    });
  }

  // toServer : 라이어 투표
  const liarVote = (nickname) => {
    console.log('liarVote', nickname);
    if (!client.current.connected) return;

    client.current.publish({
      destination: `/pub/lier/game/${id}/vote`,
      body: JSON.stringify({
        value: nickname
      }),
    });
  }

  // toServer : 투표로 걸린 라이어가 입력한 답을 서버로 전송한다. / 없으면 그냥 빈칸으로 전달을 드릴게요. 
  const isAnswer = (answer) => {
    console.log('isAnswer', answer);
    if (!client.current.connected) return;

    client.current.publish({
      destination: `/pub/lier/game/${id}/isAnswer`,
      body: JSON.stringify({
        value: answer
      }),
    });
  }


  const endgame = () => {
    console.log('endgame');
    if (!client.current.connected) return;

    client.current.publish({
      destination: `/pub/lier/game/${id}/endgame`,
    });
  }

  const handleBack = () => {
    // Back 예외처리 다시 해야함
    // window.history.pushState(null, "", window.location.href)
    // const result = window.confirm('정말 게임에서 나가시겠어요?');
    // if (result) {
    //   navigate('/lobby');
    // }
  }

  const test = () => {
    setStageNumber(8)
    setResultStatus('LIER')
    // dispatch(setGameBoardStatus(''));
    // dispatch(setPopupStatus('NLIER'))
    // setIsPop(true);
  }

  useEffect(() => {
    console.log('useEffect');
    window.history.pushState(null, "", window.location.href)
    enterRoom();
    connect();

    // 뒤로가기 Event 막기
    window.addEventListener('popstate', handleBack);

    return () => {
      return (
        console.log('useEffect return'),
        window.removeEventListener('popstate', handleBack),
        disconnect(),
        leaveRoom()
      );
    }
  }, []);

  useEffect(() => {

    switch (stageNumber) {
      case 0:
        // 게임시작 대기
        break;
      case 1:
        // 게임시작 : 라이어 통보
        dispatch(setGameBoardStatus(isLiar ? 'SHOW_LIER' : 'SHOW_KEYWORD'));
        break;
      case 2:
        // 게임레디 : 나 혼자
        break;
      case 3:
        // 게임레디 : 모두 다
        dispatch(setGameBoardStatus(isLiar ? 'SHOW_LIER' : 'SHOW_KEYWORD'));
        setTimer({ time: 5, status: 1 });
        break;
      case 4:
        // spotlight
        // spotlight();
        break;
      case 5:
        // 한번 더 투표
        dispatch(setGameBoardStatus(isMaster ? 'VOTE_ONEMORE' : ''));
        break;
      case 6:
        // 라이어 투표
        setIsPop(true);
        dispatch(setPopupStatus('LIER_VOTE'));
        break;
      case 7:
        // 투표 결과
        break;
      case 8:
        if (resultStatus === 'NLIER') {
          dispatch(setPopupStatus('NLIER'))
          setIsPop(true);

          setTimer({ time: 3, status: 1 });
        } else if (resultStatus === 'LIER') {
          if (isLiar) {
            dispatch(setPopupStatus('LIER_LIER'));
            setIsPop(true);
          } else {
            dispatch(setPopupStatus('LIER_USER'));
            setIsPop(true);
          }
        }
        break;
      case 9:
        endgame();
        break;
    }
  }, [stageNumber])

  useEffect(() => {

    if (stageNumber === 3 && timer.status === 2) {
      setStageNumber(4);
      setTimer({ ...timer, status: 0 });
      setMuted(true);
      setStatusSpotlight(0);
      setIsPop(false);
      if (isMaster)
        spotlight();
    }

    // spotlight 한 턴 끝
    console.log('stageNumber' + stageNumber)
    console.log('timer.status' + timer.status)
    if (stageNumber === 4 && timer.status === 2) {
      dispatch(setSpotlightMember(''));
      // 내 턴이 끝났을 때
      console.log(statusSpotlight);
      if ((statusSpotlight === 1)) {
        console.log('내 턴 종료');
        setTimer({ ...timer, status: 0 });
        setStatusSpotlight(0);
        spotlight();
      }
    }

    if (stageNumber === 7 && timer.status === 2 && resultStatus === 'DRAW') {
      setStageNumber(4);
      setTimer({ ...timer, status: 0 });
      setIsPop(false);
    }

    if (stageNumber === 7 && timer.status === 2 && resultStatus !== 'DRAW') {
      setStageNumber(8);
      setTimer({ ...timer, status: 0 });
      setIsPop(false);
    }

    if (stageNumber === 8 && timer.status === 2) {
      // 라이어 win
      if (resultStatus === 'NLIER' || resultStatus === 'DRAWANDENDGAME') {
        setStageNumber(9);
        setIsPop(true);
        setResultStatus('WIN_LIER');
        dispatch(setPopupStatus('VICTORY_LIER'));
      } else {
        if (resultStatus === 'LIER') {
          if (isLiar) {
            dispatch(setPopupStatus('LIER_LIER'));
            setIsPop(true);
          } else {
            dispatch(setPopupStatus('LIER_USER'));
            setIsPop(true);
          }
        } else {
          setStageNumber(9);
          setIsPop(true);
          setResultStatus('WIN_USER');
          dispatch(setPopupStatus('VICTORY_USER'));
        }
      }
    }

  }, [timer.status])

  useEffect(() => {
    console.log(isMaster);
  }, [isMaster])


  return (
    <div className="section">
      <img src={gameRoomBackground} className='background' />
      <div className='gameRoomSection'>
        <div className='headerSection'>
          <div className='headerBox'>
            {/* <a href="#" onClick={leaveRoom}>
              <img src={btnExit} />
            </a> */}
            <Link to='/lobby'>
              <img src={btnExit} />
            </Link>
          </div>
          <div className='headerBox'>
            <GameTimer sec={timer} setSec={setTimer} />
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
            <VideoRoomComponent openviduServerUrl='https://cheiks.shop' sessionName={id} isMute={muted} />
          </div>
          <div className='boardSection'>
            <div className="gameBoard">
              <GameBoard stageNumber={stageNumber} isLiar={isLiar} item={item} govote={govote} onemorevote={onemorevote} />
            </div>
            <div className="chatBoard">
              <Chat id={id} />
              <span style={{ color: 'white' }}>{stageNumber}</span>
            </div>
            {stageNumber === 0 && isMaster ? <a href='#' onClick={gameStart}><BtnStartReady status='Start' /></a> : ''}
            {stageNumber === 1 ? <a href='#' onClick={gameReady}><BtnStartReady status='Ready' /></a> : ''}
            {stageNumber === 2 ? <BtnStartReady status='ReadyInert' /> : ''}
          </div>
        </div>
      </div>
      {isPop ? <GamePopup closePopup={closePopup} round={round} isAnswer={isAnswer} liarVote={liarVote} /> : ''}
    </div>
  )
}

export default GameRoom;


const BtnStartReady = ({ status }) => {

  // Ready 함수 작업 해야함
  switch (status) {
    case 'Start':
      return <img src={btnStart} />
      break;
    case 'StartInert':
      return <img src={btnStartInert} />
      break;
    case 'Ready':
      return <>
        <img src={btnReady} />
      </>
      break;
    case 'ReadyInert':
      return <>
        <img src={btnReadyInert} />
      </>
      break;
  }
}