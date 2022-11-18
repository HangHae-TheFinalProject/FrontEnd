import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useInput from '../../hooks/useInput';
import GoogleLogin from '../googleLogin/GoogleLogin';
import instance from '../../shared/Request';
import './style.scss';

export default function FormSignIn() {
  const [cookie, setCookie, removeCookie] = useCookies();

  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const [msgMail, setMsgMail] = useState('');
  const nav = useNavigate();

  const mailCheck = () => {
    const result = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);

    if (result) setMsgMail('');
    else setMsgMail('메일 형식이 아닙니다.');

    return result;
  }

  const loginOnClickHandler = () => {
    instance
      .post('/lier/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        setCookie(
          'access_token',
          res.request.getResponseHeader('authorization')
        );
        setCookie(
          'refresh_token',
          res.request.getResponseHeader('refresh-token')
        );
        sessionStorage.setItem('email', res.data.data.email);
        sessionStorage.setItem('nickname', res.data.data.nickname);
        alert(res.data.statusMsg);
        nav('/lobby');
      });
  };

  return (
    <>
      <div className="signinBox">
        <div className="bodySignin">
          <div className="divTitleBox">
            <h2>로그인</h2>
          </div>
          <div className="divInputBox">
            <input
              type="text"
              placeholder="  이메일을 입력해주세요."
              onChange={setEmail}
              onBlur={mailCheck}
            ></input>

            <p className="emailText">{msgMail}</p>

            <input
              type="password"
              placeholder="  비밀번호를 입력해주세요."
              onChange={setPassword}
            ></input>
          </div>

          <div className="divButtonBox">
            <button className="loginBtn" onClick={loginOnClickHandler}>
              로그인
            </button>
            <GoogleLogin className="googleBtn"></GoogleLogin>
          </div>

          <div className="divSignUpBox">
            <p className="joinText">아직 라이어게임 참가자가 아니신가요?</p>
            <a href='/signup'><p className="joinBtn">
              회원가입
            </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
