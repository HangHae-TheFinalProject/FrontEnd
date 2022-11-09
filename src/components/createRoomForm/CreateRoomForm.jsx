import axios from 'axios';
import useInput from '../../hooks/useInput';

import './style.scss';

// need to : 방 만들고 입장하는 기능
function CreateRoomForm() {
  const DEFAULT_GAMEMODE = '1';
  const [title, titleHandler] = useInput('기본 방 제목');
  const [password, passwordHandler] = useInput();
  const [gamemode, gamomodeHandler] = useInput(DEFAULT_GAMEMODE);
  
  const createRoomHandler = () => {
    // axios.post('server', {
    //   roomName: title,
    //   roomPassword: password,
    //   mode: gamemode
    // })
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