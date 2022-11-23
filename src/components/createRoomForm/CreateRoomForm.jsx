import useInput from '../../hooks/useInput';
import instance from '../../shared/Request';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRoom } from '../../redux/modules/roomsSlice';
import createRoomImg from '../../images/png/createRoomImg 3517.png';
import './style.scss';
import { useState } from 'react';

// need to : 방 만들고 입장하는 기능
function CreateRoomForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const DEFAULT_GAMEMODE = '1';

  const [title, titleHandler] = useInput('');
  const [password, passwordHandler] = useInput();
  const [gamemode, gamemodeHandler] = useInput(DEFAULT_GAMEMODE);

  // 방 만들기 api
  const createRoomHandler = async () => {
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
    <div src={createRoomImg} className="createRoomBox">
      <img src={createRoomImg} className="modalBackground" />

      <h1 className="roomCreateTitle">방 만들기</h1>
      <div className="titlePasswordBox">
        <input
          type="text"
          onChange={titleHandler}
          placeholder="방 제목을 입력해주세요."
        />
        <input
          type="password"
          onChange={passwordHandler}
          placeholder="방 비밀번호를 입력해주세요."
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
  );
}

export default CreateRoomForm;
