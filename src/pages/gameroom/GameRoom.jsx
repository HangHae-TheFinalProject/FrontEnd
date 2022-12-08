import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';

import {
  setSpotlightMember,
  setPopupStatus,
  setGameBoardStatus,
  setMemberList,
  removeMemberList,
  setMemberVoteResult,
  setMemberLier,
  setIsCamera,
  setIsCantGetDevice,
  addReadyMemberList,
  setReadyMemberList
} from '../../redux/modules/gameSlice';

import {
  setOwner
} from '../../redux/modules/roomsSlice';

import * as SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';

// component
import instance from '../../shared/Request';
import VideoRoom from '../../components/videoroom/videoRoom/VideoRoom';
import Chat from '../../components/chat/Chat';
import GameBoard from '../../components/gameBoard/GameBoard';
import GameTimer from '../../components/gameTimer/GameTimer';
import GamePopup from '../../components/gamePopup/GamePopup';

// image
import btnStart from '../../images/png/btnStart.png';
import btnStartInert from '../../images/png/btnStartInert.png';
import btnReady from '../../images/png/btnReady.png';
import btnReadyInert from '../../images/png/btnReadyInert.png';
import btnExit from '../../images/png/btnExit.png';
import gameRoomBackground from '../../images/png/gameRoomBackground.png';
import iconMicOff from '../../images/png/iconMicOff.png';
import iconMicOn from '../../images/png/iconMicOn.png';
import iconVideoOff from '../../images/png/iconVideoOff.png';
import iconVideoOn from '../../images/png/iconVideoOn.png';

// style
import './style.scss';
import { getByDisplayValue } from '@testing-library/react';

function GameRoom() {
  const MIN_MEMBER_COUNT = 3;

  const { id } = useParams();
  const [cookie] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [stageNumber, setStageNumber] = useState(0);
  const [muted, setMuted] = useState(false);
  const [micOff, setMicOff] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const nickname = sessionStorage.getItem('nickname');

  // gamestatus
  const [round, setRound] = useState(0);
  // Timer status : 0 대기 1 시작 2 종료
  const [timer, setTimer] = useState({ time: -1, status: 0 });
  // statusSpotlight : 0 대기 1 내 차례 2 다른 사람 차례
  const [statusSpotlight, setStatusSpotlight] = useState(0)

  const [resultStatus, setResultStatus] = useState('');
  const [item, setItem] = useState({ category: '', keyword: '' });
  const [poorItem, setPoorItem] = useState({ category: '', keyword: '' });
  const [isPop, setIsPop] = useState(false);
  const [isMaster, setIsMaster] = useState(useSelector(state => state.rooms.room.owner) === nickname);
  const [isLiar, setIsLiar] = useState(false);
  const gamemode = useSelector(state => state.rooms.room.mode);
  const [memberCount, setMemberCount] = useState(1);

  const closePopup = () => { setIsPop(false); }

  const leaveRoom = async () => {

    try {
      instance.delete(`/lier/room/${Number(id)}/exit`)
      .then(res => {
        navigate('/lobby');
      })
    } catch (error) {
      alert(error.data.message);
      navigate('/lobby');
    }
  }

  const enterRoom = () => {

    instance.post(`/lier/room/${Number(id)}`)
    .catch((error) => {
      alert('잘못된 입장입니다.');
      navigate('/lobby');
    })
  }

  // Sock
  const client = useRef({});

  const connectHeaders = {
    'Authorization': cookie['access_token'],
    'Refresh-Token': cookie['refresh_token']
  };

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJs(`${process.env.REACT_APP_API_URL}/ws-stomp`),
      connectHeaders,
      debug: function (str) {
      },
      onConnect: () => {
        subscribe();
        subscribePersonal();
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
    client.current.deactivate();
  };

  // stomp 구독
  const subscribe = () => {
    client.current.subscribe(
      `/sub/gameroom/${id}`,
      ({ body }) => {
        const data = JSON.parse(body)

        switch (data.type) {
          case 'JOIN':
            setMemberCount(data.content.memberCnt);
            break;
          case 'LEAVE':
            setMemberCount(data.content.memberCnt);
            dispatch(removeMemberList(data.sender));
            break;
          case 'NEWOWNER':
            dispatch(setOwner(data.sender));
            setIsMaster(nickname === data.sender);
            break;
          case 'RESET':
            alert(data.content);
            initialize();
            break;
          case 'START':
            setStageNumber(1);    // 함수로 연결
            setItem({ category: data.content.category, keyword: data.content.keyword });
            setIsLiar(nickname === data.content.lier);
            dispatch(setMemberLier(data.content.lier));
            dispatch(setMemberList(data.content.memberlist));
            if (gamemode === '바보') {
              setPoorItem({ category: data.content.liercategory, keyword: data.content.lierkeyword });
            }
            break;
          case 'READY':
            dispatch(addReadyMemberList(data.sender));
            break;
          case 'ALLREADY':
            dispatch(setReadyMemberList([]));
            setStageNumber(3);
            break;
          case 'SPOTLIGHT':
            dispatch(setSpotlightMember(data.sender));
            if (data.sender === nickname) {
              setStatusSpotlight(1);
              setMuted(false);
            } else {
              setStatusSpotlight(2);
              setMuted(true);
            }
            setTimer({ time: 5, status: 1 });
            break;
          case 'COMPLETE':
            setStageNumber(5);
            setRound(data.content.round);
            setStatusSpotlight(0);
            setMuted(false);
            break;
          case 'ALLCOMPLETE':
            setStageNumber(6);
            setGameBoardStatus('');
            setStatusSpotlight(0);
            setMuted(false);
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

              setTimer({ time: 10, status: 1 });
            } else {
              setStageNumber(9);
              setIsPop(true);
              setResultStatus('WIN_USER');
              dispatch(setPopupStatus('VICTORY_USER'));

              setTimer({ time: 10, status: 1 });
            }
            break;
        }
      }
    );
  };

  const subscribePersonal = () => {
    client.current.subscribe(
      `/sub/gameroom/${id}/${nickname}`,
      ({ body }) => {
        const data = JSON.parse(body)
        switch (data.type) {
          case 'REWARD':
            // Reward 알림
            break;
        }
      }
    );
  };

  // Stomp publish 함수 --------------------
  const gameStart = (message) => {

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

  const spotlight = (sender) => {

    if (!client.current.connected) return;

    client.current.publish({
      destination: `/pub/lier/game/${id}/spotlight`,
    });
  }

  const onemorevote = () => {

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

  const liarVote = (nickname) => {

    if (!client.current.connected) return;

    client.current.publish({
      destination: `/pub/lier/game/${id}/vote`,
      body: JSON.stringify({
        value: nickname
      }),
    });
  }

  const isAnswer = (answer) => {

    if (!client.current.connected) return;

    client.current.publish({
      destination: `/pub/lier/game/${id}/isAnswer`,
      body: JSON.stringify({
        value: answer
      }),
    });
  }

  const endgame = () => {

    if (!client.current.connected) return;

    client.current.publish({
      destination: `/pub/lier/game/${id}/endgame`,
    });
  }

  // need to : 아직 test 안함
  const initialize = () => {
    setStageNumber(0);
    setMuted(false);
    setRound(0);
    setTimer({ time: -1, status: 0 });
    setStatusSpotlight(0);
    setResultStatus('');
    setItem({ category: '', keyword: '' });
    setPoorItem({ category: '', keyword: '' });
    setIsPop(false);
    setIsLiar(false);

    dispatch(setMemberLier(''));
    dispatch(setSpotlightMember(''));
    dispatch(setPopupStatus('WAIT_START'));
    dispatch(setGameBoardStatus('WAIT_START'));
    dispatch(setMemberVoteResult(''));
    dispatch(setReadyMemberList([]));
  }

  let isCantGetDevice = false;

  useEffect(() => {

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(res => {
        dispatch(setIsCamera(res.getVideoTracks()[0] || res.getAudioTracks()[0] ? true : false));
        isCantGetDevice = false;
      })
      .catch(err => {
        alert('마이크 또는 비디오를 사용이 어렵습니다. 게임방 입장이 어려울 수 있습니다.');
        isCantGetDevice = true;
        dispatch(setIsCantGetDevice(isCantGetDevice));
        navigate('/lobby');
      })

    enterRoom();
    connect();
    initialize();


    return () => {
      return (
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
        if (isMaster) endgame();
        break;
    }
  }, [stageNumber]);

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

    if (stageNumber === 4 && timer.status === 2) {
      dispatch(setSpotlightMember(''));
      // 내 턴이 끝났을 때
      if ((statusSpotlight === 1)) {
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
    if (stageNumber === 9 && timer.status === 2) {
      initialize();
    }
  }, [timer.status])

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
            {/* <GameTimer sec={timer} setSec={setTimer} /> */}
            <GameTimer timer={timer} setTimer={setTimer} />
          </div>
          <div className='headerBox'>
            <a href='#'>
              <div className='btncircle'>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="28" fill="none"><path fill="#fff" fillOpacity=".7" d="M10.272.947a13.32 13.32 0 0 1 5.455-.003 5.323 5.323 0 0 0 2.607 3.816 5.324 5.324 0 0 0 4.61.348 13.322 13.322 0 0 1 2.723 4.727 5.325 5.325 0 0 0-2 4.165c0 1.685.781 3.188 2.003 4.165a13.39 13.39 0 0 1-2.728 4.724 5.324 5.324 0 0 0-4.608.348 5.325 5.325 0 0 0-2.606 3.814c-1.798.378-3.655.38-5.454.005a5.325 5.325 0 0 0-2.607-3.82 5.323 5.323 0 0 0-4.61-.347 13.321 13.321 0 0 1-2.723-4.728 5.325 5.325 0 0 0 2-4.162A5.324 5.324 0 0 0 .33 9.833 13.39 13.39 0 0 1 3.06 5.11a5.324 5.324 0 0 0 4.608-.348A5.324 5.324 0 0 0 10.272.948V.947ZM13 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" /></svg>
              </div>
            </a>
          </div>
        </div>
        <div className="bodySectionTopSpace"> </div>
        <div className="bodySection">
          <div className='videoSection'>
            <VideoRoom sessionName={id} isMute={muted} isMicOff={micOff} isVideoOn={videoOn} />
          </div>
          <div className='boardSection'>
            <div className="gameBoard">
              {
                gamemode === '일반' ? <GameBoard item={item} govote={govote} onemorevote={onemorevote} />
                  : <GameBoard item={item} poorItem={poorItem} govote={govote} onemorevote={onemorevote} />
              }
            </div>
            <div className="chatBoard">
              <Chat id={id} />
            </div>
            <div className="btnBoard">
              <div className='mvIconWrap'>
                <div className='mvIconBox' onClick={() => setMicOff(!micOff)}>{micOff ? <img src={iconMicOff} /> : <img src={iconMicOn} />}</div>
                <div className='mvIconBox' onClick={() => setVideoOn(!videoOn)}>{videoOn ? <img src={iconVideoOn} /> : <img src={iconVideoOff} />}</div>
              </div>
              {stageNumber === 0 && isMaster && memberCount >= MIN_MEMBER_COUNT  ? <a href='#' onClick={gameStart}><BtnStartReady status='Start' /></a> : ''}
              {stageNumber === 0 && isMaster && memberCount < MIN_MEMBER_COUNT ? <BtnStartReady status='StartInert' /> : ''}
              {stageNumber === 1 ? <a href='#' onClick={gameReady}><BtnStartReady status='Ready' /></a> : ''}
              {stageNumber === 2 ? <BtnStartReady status='ReadyInert' /> : ''}
            </div>
          </div>
        </div>
        <div className="bodySectionBottomSpace"> </div>
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