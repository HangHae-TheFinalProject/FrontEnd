import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

import useInput from '../../../hooks/useInput';
import instance from '../../../shared/Request';
import GoogleLogin from '../googleLogin/GoogleLogin';
import { setClientHeaders } from '../../../shared/Request';

import { ReactComponent as Redicon } from '../../../images/svg/Redicon.svg';
import gameRoomBackground from '../../../images/png/gameRoomBackground.png';
import gameTitle from '../../../images/svg/gameTitle.svg';

import './style.scss';

export default function FormSignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  // 유효성 검사
  const [msgMail, setMsgMail] = useState('');
  const [msgMember, setMember] = useState('');
  const [show, setShow] = useState(false);
  const [secondShow, setSecondShow] = useState(false);

  const mailCheck = () => {
    const result = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
      email
    );

    if (result) {
      setMsgMail('');
      setShow(false);
    } else {
      setMsgMail(`올바른 메일 형식이 아니에요.`);
      setShow(true);
    }

    return result;
  };

  const loginOnClickHandler = () => {
    if (email.trim() === '') {
      alert('이메일을 입력해주세요.');
      return;
    } else if (password.trim() === '') {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    instance
      .post('/lier/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        new Cookies().set(
          'access_token',
          res.request.getResponseHeader('authorization')
        );
        new Cookies().set(
          'refresh_token',
          res.request.getResponseHeader('refresh-token')
        );
        sessionStorage.setItem('email', res.data.data.email);
        sessionStorage.setItem('nickname', res.data.data.nickname);
        sessionStorage.setItem(
          'realnickname',
          res.data.data.nickname.replace(/#\d*/, '')
        );
        const access_token = res.request.getResponseHeader('authorization');
        const refresh_token = res.request.getResponseHeader('refresh-token');
        setClientHeaders({
          // interceptor
          access: access_token,
          refresh: refresh_token,
        });
        alert(res.data.statusMsg);
        navigate('/lobby');
      })
      .catch((error) => {
        if (error) {
          setMember('등록되지 않은 이메일이에요.');
          setSecondShow(true);
          setTimeout(() => {
            setSecondShow(false);
          }, 3000);
        }
      });
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') loginOnClickHandler();
  };

  return (
    <>
      <img
        className="signInBackground"
        src={gameRoomBackground}
        alt="background"
      />
      <div className="signInContainer fontSemiBold">
        <img className="gameTitle" src={gameTitle} alt="gameTitle" />
        <div className="signInBody fontSemiBold">
          <span className="signInName fontLightBold">로그인</span>
          <div className="signInInputBox">
            <div>
              <input
                type="email"
                onChange={setEmail}
                onBlur={mailCheck}
                onKeyPress={onKeyPress}
                placeholder="이메일을 입력해주세요."
              />
              <div className="signInTest">
                {show ? (
                  <p className="fail">
                    <Redicon />
                    {msgMail}
                  </p>
                ) : null}
                {secondShow ? (
                  <p className="fail">
                    <Redicon />
                    {msgMember}
                  </p>
                ) : null}
              </div>
              <input
                type="password"
                onChange={setPassword}
                onKeyPress={onKeyPress}
                placeholder="비밀번호를 입력해주세요."
              />
            </div>
          </div>
          <div className="signInButtonBox">
            <button className="signInBtn" onClick={loginOnClickHandler}>
              로그인
            </button>
            <GoogleLogin />
          </div>
          <div className="toSignUpBox">
            <p className="joinText">아직 라이어게임 참가자가 아니신가요?</p>
            <p className="joinBtn fontBold" onClick={() => navigate('/signup')}>
              회원가입
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
