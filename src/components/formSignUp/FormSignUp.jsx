import { useState } from 'react';
import instance from '../../shared/Request';
import useInput from '../../hooks/useInput';
import './style.scss';
import gameRoomBackground from '../../images/png/gameRoomBackground.png';
import { ReactComponent as Redicon } from '../../images/svg/Redicon.svg';
import { useNavigate } from 'react-router-dom';

export default function FormSignUp() {
  const nav = useNavigate();

  const [name, setName] = useInput('');
  const [mail, setMail] = useInput('');
  const [password, setPassword] = useInput('');
  const [passwordConfirm, setPasswordConfirm] = useInput('');
  // 유효성 검사
  const [msgName, setMsgName] = useState('');
  const [msgMail, setMsgMail] = useState('');
  const [msgPassword, setMsgPassword] = useState('');
  const [msgPasswordConfirm, setMsgPasswordConfirm] = useState('');
  // 유효성 검사
  const [showName, setShowName] = useState(false);
  const [showMail, setShowMail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const mailCheck = () => {
    const result = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
      mail
    );

    if (result) {
      setMsgMail('');
      setShowMail(false);
    } else {
      setMsgMail('올바른 메일 형식이 아닙니다.');
      setShowMail(true);
    }

    return result;
  };

  const nameCheck = () => {
    if (name) {
      setMsgName('');
      setShowName(false);
    } else {
      setMsgName('닉네임을 입력해주세요.');
      setShowName(true);
    }

    return name;
  };

  const passwordCheck = () => {
    const result = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/.test(
      password
    );

    if (result) {
      setMsgPassword('');
      setShowPassword(false);
    } else {
      setMsgPassword('영문, 숫자, 특수문자로 작성해주세요.');
      setShowPassword(true);
    }

    return result;
  };

  const passwordConfirmCheck = () => {
    const result = password === passwordConfirm;

    if (result) {
      setMsgPasswordConfirm('');
      setShowPasswordConfirm(false);
    } else {
      setMsgPasswordConfirm('비밀번호가 일치하지 않습니다.');
      setShowPasswordConfirm(true);
    }

    return result;
  };

  const joinOnClickHandler = () => {
    if (
      !(nameCheck() && mailCheck() && passwordCheck() && passwordConfirmCheck())
    ) {
      alert('입력한 값을 확인해주세요.');
      return;
    }

    instance
      .post(
        '/lier/signup',
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
        if (res.data.statusMsg) {
          alert(res.data.data);
          nav('/');
        }
      })
      .catch((error) => {
        alert(error.response.data.statusMsg);
      });
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') joinOnClickHandler();
  };

  return (
    <>
      <img src={gameRoomBackground} className="background" />
      <div className="signupBox">
        <div className="signupBody">
          <div className="signupText">
            <h2>회원가입</h2>
          </div>
          <div className="signupInput">
            <input
              type="email"
              onChange={setMail}
              onBlur={mailCheck}
              onKeyPress={onKeyPress}
              placeholder="메일을 입력하세요"
            />
            {showMail ? (
              <p>
                <Redicon />
                {msgMail}
              </p>
            ) : null}
          </div>
          <div className="signupInput">
            <input
              type="text"
              onChange={setName}
              onBlur={nameCheck}
              onKeyPress={onKeyPress}
              placeholder="닉네임을 입력하세요"
            />
            {showName ? (
              <p>
                <Redicon />
                {msgName}
              </p>
            ) : null}
          </div>
          <div className="signupInput">
            <input
              type="password"
              name="password"
              onChange={setPassword}
              onBlur={passwordCheck}
              onKeyPress={onKeyPress}
              placeholder="비밀번호를 입력하세요"
            />
            {showPassword ? (
              <p>
                <Redicon />
                {msgPassword}
              </p>
            ) : null}
            <p></p>
          </div>
          <div className="signupInput">
            <input
              type="password"
              name="passwordConfirm"
              onChange={setPasswordConfirm}
              onBlur={passwordConfirmCheck}
              onKeyPress={onKeyPress}
              placeholder="비밀번호를 입력하세요"
            />
            {showPasswordConfirm ? (
              <p>
                <Redicon />
                {msgPasswordConfirm}
              </p>
            ) : null}
            <p></p>
          </div>
          <div className="signupBtnBox">
            <button onClick={joinOnClickHandler}>회원가입</button>
            <div className="divLoginText">
              <p className="loginText">기존 라이어게임 참가자이신가요?</p>
              <a href="/">
                <p className="signinBtn">로그인</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
