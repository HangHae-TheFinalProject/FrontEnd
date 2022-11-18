import { useState } from 'react';
import instance from '../../shared/Request';
import useInput from '../../hooks/useInput';
import './style.scss';
import gameRoomBackground from '../../images/png/gameRoomBackground.png';
import { ReactComponent as Redicon } from '../../images/svg/Redicon.svg';
import { useNavigate } from 'react-router-dom';

export default function FormSignUp() {
  const [name, setName] = useInput('');
  const [mail, setMail] = useInput('');
  const [password, setPassword] = useInput('');
  const [passwordConfirm, setPasswordConfirm] = useInput('');

  const [msgName, setMsgName] = useState('');
  const [msgMail, setMsgMail] = useState('');
  const [msgPassword, setMsgPassword] = useState('');
  const [msgPasswordConfirm, setMsgPasswordConfirm] = useState('');
  const [showName, setShowName] = useState(false);
  const [showMail, setShowMail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const nav = useNavigate();

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
        console.log(res);
        if (res.data.statusMsg) {
          alert(res.data.data);
          nav('/');
        } else {
          alert(res.data.error);
        }
      });
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
              type="text"
              onChange={setName}
              onBlur={nameCheck}
              placeholder="닉네임을 입력하세요"
            ></input>
            {showName ? (
              <p>
                <Redicon />
                {msgName}
              </p>
            ) : null}
          </div>
          <div className="signupInput">
            <input
              type="text"
              onChange={setMail}
              onBlur={mailCheck}
              placeholder="메일을 입력하세요"
            ></input>
            {showMail ? (
              <p>
                <Redicon />
                {msgMail}
              </p>
            ) : null}
          </div>

          <div className="signupInput">
            <input
              type="password"
              name="password"
              onBlur={passwordCheck}
              placeholder="비밀번호를 입력하세요"
              onChange={setPassword}
            ></input>
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
              placeholder="비밀번호를 입력하세요"
              onBlur={passwordConfirmCheck}
              onChange={setPasswordConfirm}
            ></input>
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
