import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import './style.scss';

export default function FormSignUp() {
  const [name, setName] = useInput('');
  const [mail, setMail] = useInput('');
  const [password, setPassword] = useInput('');
  const [passwordConfirm, setPasswordConfirm] = useInput('');
  const nav = useNavigate();

  const joinOnClickHandler = () => {
    axios
      .post(
        'https://haetae.shop/lier/signup',
        {
          nickname: name,
          email: mail,
          password: password,
          passwordConfirm: passwordConfirm,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.statusMsg) {
          alert(res.data.data);
        } else {
          alert(res.data.error);
        }
      });
  };

  const loginClick = () => {
    nav('/SignIn');
  };

  return (
    <>
      <div className="divSignInBox">
        <div className="divTitleBox">
          <h2>회원가입</h2>
        </div>

        <div className="divInputBox">
          <input
            type="text"
            onChange={setName}
            placeholder="이름을 입력하세요"
          ></input>
          <p>비밀번호가 일치하지 않습니다</p>

          <input
            type="text"
            onChange={setMail}
            placeholder="메일을 입력하세요"
          ></input>
          <p>비밀번호가 일치하지 않습니다</p>
        </div>

        <div className="divInputPassword">
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onChange={setPassword}
          ></input>
          <p>비밀번호가 일치하지 않습니다</p>

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
          <div className="divLoginText">
            <p className="loginText">기존 라이어게임 참가자이신가요?</p>
            <p className="loginBtn" onClick={loginClick}>
              로그인
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
