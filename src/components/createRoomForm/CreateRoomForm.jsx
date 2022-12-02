import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import useInput from '../../hooks/useInput';
import instance from '../../shared/Request';

import { setRoom } from '../../redux/modules/roomsSlice';
import createRoomModal from '../../images/png/createRoomModalBackground.png';

import './style.scss';

// need to : 방 만들고 입장하는 기능
function CreateRoomForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const DEFAULT_GAMEMODE = '1';

  const arrRoomName = [
    '타르타로스',
    '길잃은 영혼',
    '영겁의 시간',
    '어서오세요',
    '오시면 바로 시작',
    '아무나 오세요',
  ];
  const randomRoomNumber = Math.trunc(Math.random() * (arrRoomName.length - 1));
  const [title, titleHandler] = useInput(arrRoomName[randomRoomNumber]);
  const [password, passwordHandler] = useInput();
  const [gamemode, gamemodeHandler] = useInput(DEFAULT_GAMEMODE);

  // 방 만들기 api
  const createRoomHandler = async () => {
    if (!title) {
      alert('방 제목을 입력해주세요.');
      return;
    }

    try {
      const { data } = await instance.post('/lier/room', {
        roomName: title,
        roomPassword: password,
        mode: gamemode * 1,
      });
      dispatch(setRoom(data.data));
      navigate(`/gameroom/${data.data.roomId}`);
    } catch (error) {
      alert('방 생성에 실패했습니다.');
      navigate('/');
    }
  };

  return (
    <div className="createRoomBox">
      <img
        className="modalBackground"
        alt="createRoomModal"
        src={createRoomModal}
      />
      <div className="modalInput">
        <h1 className="roomCreateTitle fontLightBold">방 만들기</h1>
        <div className="titlePasswordBox">
          <input
            type="text"
            onChange={titleHandler}
            defaultValue={arrRoomName[randomRoomNumber]}
            placeholder="방 제목을 입력해 주세요."
          />
          <input
            type="text"
            onChange={passwordHandler}
            placeholder="방 비밀번호를 입력해 주세요."
          />
        </div>
        <div className="modeCheckBox">
          <label className={`btn ${gamemode === '1' ? 'active' : ''}`}>
            <input
              id="radio"
              type="radio"
              name="gameMode"
              value={1}
              onChange={gamemodeHandler}
              checked={gamemode === '1'}
            />
            <span>일반모드</span>
          </label>
          <label className={`btn ${gamemode === '2' ? 'active' : ''}`}>
            <input
              id="radio"
              type="radio"
              name="gameMode"
              value={2}
              onChange={gamemodeHandler}
              checked={gamemode === '2'}
            />
            <span>바보 모드</span>
          </label>
        </div>
        <div className="btnBox">
          <input type="button" value="방만들기" onClick={createRoomHandler} />
        </div>
      </div>
    </div>
  );
}

export default CreateRoomForm;
