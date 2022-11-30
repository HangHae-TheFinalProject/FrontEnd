import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import useInput from '../../hooks/useInput';
import GoogleLogin from '../googleLogin/GoogleLogin';
import instance from '../../shared/Request';
import { setClientHeaders } from '../../shared/Request';

import { ReactComponent as Redicon } from '../../images/svg/Redicon.svg';
import gameRoomBackground from '../../images/png/gameRoomBackground.png';

import './style.scss';

export default function FormSignIn() {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();

  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  // 유효성 검사
  const [msgMail, setMsgMail] = useState('');
  const [show, setShow] = useState(false);

  const mailCheck = () => {
    const result = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
      email
    );

    if (result) {
      setMsgMail('');
      setShow(false);
    } else {
      setMsgMail(`메일 형식이 아닙니다.`);
      setShow(true);
    }

    return result;
  };

  const loginOnClickHandler = () => {
    instance
      .post('/lier/login', {
        email: email,
        password: password,
      })
      .then((res) => {

        const access_token = res.request.getResponseHeader('authorization');
        const refresh_token = res.request.getResponseHeader('refresh-token');

        setClientHeaders({
          // interceptor
          access: access_token,
          refresh: refresh_token
        })

        setCookie(
          'access_token',
          access_token
        );
        
        setCookie(
          'refresh_token',
          refresh_token
        );
        sessionStorage.setItem('email', res.data.data.email);
        sessionStorage.setItem('nickname', res.data.data.nickname);
        sessionStorage.setItem('realnickname', res.data.data.nickname.replace(/#\d*/, '')	);
        alert(res.data.statusMsg);
        navigate('/lobby');
      })
      .catch((error) => {
        alert(error.response.data.statusMsg);
      });
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') loginOnClickHandler();
  };

  return (
    <>
      <img src={gameRoomBackground} className="background" />
      <div className="signBox">
        <div className="bodySignin">
          <div className="divTitleBox">
            <h2 className="loginName">로그인</h2>
          </div>
          <div className="loginMain">
            <div className="inputBtnBox">
              <div className="divInputBox">
                <div className="mailInputBox">
                  <input
                    className="input"
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    onChange={setEmail}
                    onBlur={mailCheck}
                    onKeyPress={onKeyPress}
                  />
                  {show ? (
                    <h4 className="emailText">
                      <Redicon />
                      {msgMail}
                    </h4>
                  ) : null}
                </div>
                <input
                  className="input"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={setPassword}
                  onKeyPress={onKeyPress}
                />
              </div>
              <div className="divButtonBox">
                <button className="loginBtn" onClick={loginOnClickHandler}>
                  로그인
                </button>
                <GoogleLogin className="googleBtn"></GoogleLogin>
              </div>
            </div>
            <div className="divSignUpBox">
              <h4 className="joinText">아직 라이어게임 참가자가 아니신가요?</h4>
              <a href="/signup">
                <h4 className="joinBtn">회원가입</h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
