import useInput from '../../hooks/useInput';
import instance from '../../shared/Request';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRoom } from '../../redux/modules/roomsSlice';

import './style.scss';

// need to : 방 만들고 입장하는 기능
function CreateRoomForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const DEFAULT_GAMEMODE = '1';
  const [title, titleHandler] = useInput('기본 방 제목');
  const [password, passwordHandler] = useInput();
  const [gamemode, gamomodeHandler] = useInput(DEFAULT_GAMEMODE);
  
  const createRoomHandler = async () => {
    try{
      const { data } = await instance.post('/lier/room', {
        roomName: title,
        roomPassword: password,
        mode: gamemode*1
      })
      dispatch(setRoom(data.data))
      navigate(`/gameroom/${data.data.roomId}`);
    } catch (error) {
      alert('방 생성에 실패했습니다.');
      navigate('/');
    }
  }

  return <div className='createRoomBox'>
    <h1>방 만들기</h1>
    <input type='text' onChange={titleHandler} value={title}/>
    <input type='password' onChange={passwordHandler} placeholder='방 비밀번호를 입력해주세요.'/>
    <div>
      <label>모드 선택 :</label>
      <input type='radio' name='gameMode' value={1} onChange={gamomodeHandler} defaultChecked/> 일반
      <input type='radio' name='gameMode' value={2} onChange={gamomodeHandler} /> 바보
    </div>
    <input type='button' value='방만들기' onClick={createRoomHandler}/>
  </div>
}

export default CreateRoomForm;