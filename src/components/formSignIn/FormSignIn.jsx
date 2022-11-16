import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import axios from 'axios';
import GoogleLogin from '../googleLogin/GoogleLogin';
import './style.scss';

export default function FormSignIn() {
  const [cookie, setCookie, removeCookie] = useCookies();

  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const nav = useNavigate();

  const signUpClick = () => {
    nav('/SignUp');
  };

  const loginOnClickHandler = () => {
    axios
      .post('https://haetae.shop/lier/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.statusCode === '0') {
          console.log('요깅', res);
          setCookie(
            'access_token',
            res.request.getResponseHeader('authorization')
          );
          setCookie(
            'refresh_token',
            res.request.getResponseHeader('refresh-token')
          );
          sessionStorage.setItem('email', res.data.data.email);
          alert(res.data.statusMsg);
          nav('/');
        } else {
          console.log(res.data.error);
        }
      });
  };

  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  return (
    <>
      <body className="bodySignin">
        <div className="divTitleBox">
          <h2>로그인</h2>
        </div>

        <div className="divInputBox">
          <input
            type="text"
            placeholder="  이메일을 입력해주세요."
            onChange={setEmail}
          ></input>
          {email !== regExp ? (
            <p className="emailText">이메일 형식이 아닙니다.</p>
          ) : (
            ''
          )}

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
          <p className="joinBtn" onClick={signUpClick}>
            회원가입
          </p>
        </div>
      </body>
    </>
  );
}
