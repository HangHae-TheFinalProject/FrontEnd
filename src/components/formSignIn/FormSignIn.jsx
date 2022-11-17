import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { DivSignIn } from './style';

import useInput from '../../hooks/useInput';
import axios from 'axios';
import GoogleLogin from '../googleLogin/GoogleLogin';

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

  return (
    <>
      <DivSignIn>
        <div className="divTitleBox">
          <h2>로그인</h2>
        </div>

        <div className="divInpuuBox">
          <input
            type="text"
            placeholder="  이메일을 입력해주세요."
            onChange={setEmail}
          ></input>

          <input
            type="password"
            placeholder="  비밀번호를 입력해주세요."
            onChange={setPassword}
          ></input>
        </div>

        <div className="divButtonBox">
          <button onClick={loginOnClickHandler}>로그인</button>
          <GoogleLogin></GoogleLogin>
        </div>

        <div className="divSignUpBox">
          <p>아직 라이어게임 참가자가 아니신가요?</p>
          <p onClick={signUpClick}>회원가입</p>
        </div>
      </DivSignIn>
    </>
  );
}