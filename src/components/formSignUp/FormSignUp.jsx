import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import { DivSignUp } from './style';

export default function FormSignUp() {
  const [name, setName] = useInput('');
  const [mail, setMail] = useInput('');
  const [password, setPassword] = useInput('');
  const [passwordConfirm, setPasswordConfirm] = useInput('');
  const nav = useNavigate();

  const joinOnClickHandler = () => {
    axios
      .post('url/lier/signup', {
        nickname: name,
        email: mail,
        password: password,
        passwordConfirm: passwordConfirm,
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.data);
        } else {
          alert(res.data.error.massage);
        }
      });
  };

  const loginClick = () => {
    nav('/SignIn');
  };

  return (
    <DivSignUp>
      <div className="divTitleBox">
        <h2>회원가입</h2>
      </div>

      <div className="divInputBox">
        <label> NAME </label>
        <input
          type="text"
          onChange={setName}
          placeholder="이름을 입력하세요"
        ></input>
        <label> EMAIL </label>
        <input
          type="text"
          onChange={setMail}
          placeholder="메일을 입력하세요"
        ></input>
      </div>

      <div className="divInputPassword">
        <label> PASSWORD </label>
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          onChange={setPassword}
        ></input>
        <label> PASSWORD </label>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={setPasswordConfirm}
        ></input>
        {password !== passwordConfirm ? (
          <p>비밀번호가 일치하지 않습니다</p>
        ) : null}
      </div>

      <div className="divSignUpBox">
        <button onClick={joinOnClickHandler}>회원가입</button>
        <p>기존 라이어게임 참가자이신가요?</p>
        <p onClick={loginClick}>로그인</p>
      </div>
    </DivSignUp>
  );
}
