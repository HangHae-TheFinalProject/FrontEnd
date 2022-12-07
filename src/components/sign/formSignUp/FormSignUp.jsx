import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useInput from '../../../hooks/useInput';
import { noheaderInstance } from '../../../shared/Request';

import gameRoomBackground from '../../../images/png/gameRoomBackground.png';
import { ReactComponent as Redicon } from '../../../images/svg/Redicon.svg';
import { ReactComponent as Greenicon } from '../../../images/svg/Greenicon.svg';

import './style.scss';

export default function FormSignUp() {
  const navigate = useNavigate();

  const [name, setName] = useInput('');
  const [mail, setMail] = useInput('');
  const [password, setPassword] = useInput('');
  const [passwordConfirm, setPasswordConfirm] = useInput('');
  // 유효성 검사
  const [msgName, setMsgName] = useState('');
  const [msgMail, setMsgMail] = useState('');
  const [msgPassword, setMsgPassword] = useState('');
  const [msgPasswordConfirm, setMsgPasswordConfirm] = useState('');
  const [msgMember, setMember] = useState('');
  // 유효성 검사
  const [showName, setShowName] = useState(false);
  const [showMail, setShowMail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [show, setShow] = useState(false);
  // 유효성 검사
  const [successName, setSuccessName] = useState(false);
  const [successMail, setSuccessMail] = useState(false);
  const [successPassword, setSuccessShowPassword] = useState(false);
  const [successPasswordConfirm, setSuccessPasswordConfirm] = useState(false);

  const nameCheck = () => {
    if (name) {
      setMsgName('사용할 수 있는 닉네임이에요.');
      setShowName(false);
      setSuccessName(true);
    } else {
      setMsgName('닉네임을 입력해주세요.');
      setShowName(true);
      setSuccessName(false);
      setTimeout(() => {
        setShowName(false);
      }, 2000);
    }

    return name;
  };

  const mailCheck = () => {
    const result = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
      mail
    );

    if (result) {
      setMsgMail('올바른 메일 형식이에요.');
      setShowMail(false);
      setSuccessMail(true);
    } else {
      setMsgMail('올바른 메일 형식이 아니에요.');
      setShowMail(true);
      setSuccessMail(false);
      setTimeout(() => {
        setShowMail(false);
      }, 2000);
    }

    return result;
  };

  const passwordCheck = () => {
    const result = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/.test(
      password
    );

    if (result) {
      setMsgPassword('사용할 수 있는 비밀번호에요.');
      setShowPassword(false);
      setSuccessShowPassword(true);
    } else {
      setMsgPassword('영문, 숫자, 특수문자로 작성해주세요.');
      setShowPassword(true);
      setSuccessShowPassword(false);
      setTimeout(() => {
        setShowPassword(false);
      }, 2000);
    }

    return result;
  };

  const passwordConfirmCheck = () => {
    const empty = passwordConfirm.trim() === '';
    const result = password === passwordConfirm;

    if (empty) {
      setMsgPasswordConfirm('내용을 입력해주세요.');
      setShowPasswordConfirm(true);
      setSuccessPasswordConfirm(false);
      setTimeout(() => {
        setShowPasswordConfirm(false);
      }, 2000);
    } else if (result) {
      setMsgPasswordConfirm('입력한 비밀번호와 동일해요.');
      setShowPasswordConfirm(false);
      setSuccessPasswordConfirm(true);
    } else {
      setMsgPasswordConfirm('비밀번호가 일치하지 않습니다.');
      setShowPasswordConfirm(true);
      setSuccessPasswordConfirm(false);
    }

    return result;
  };

  const joinOnClickHandler = () => {
    if (name.trim() === '' || !nameCheck()) {
      alert('닉네임을 입력해주세요.');
      return;
    } else if (mail.trim() === '') {
      alert('메일을 입력해주세요.');
      return;
    } else if (password.trim() === '') {
      alert('비밀번호를 입력해주세요.');
      return;
    } else if (passwordConfirm.trim() === '') {
      alert('비밀번호를 한번 더 입력해주세요.');
      return;
    } else if (!(mailCheck() && passwordCheck() && passwordConfirmCheck())) {
      alert('입력한 값을 확인해주세요.');
      return;
    }
    noheaderInstance
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
          navigate('/');
        }
      })
      .catch((error) => {
        if (error) {
          setMember('이미 등록된 이메일이에요.');
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 3000);
        }
      });
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') joinOnClickHandler();
  };

  return (
    <>
      <div className="signUpContainer fontSemiBold">
        <img
          className="signUpBackground"
          src={gameRoomBackground}
          alt="background"
        />
        <div className="signUpBody fontSemiBold">
          <span className="signUpName fontLightBold">회원가입</span>
          <div className="signUpInputBox">
            <input
              type="text"
              onChange={setName}
              onBlur={nameCheck}
              onKeyPress={onKeyPress}
              maxLength={8}
              placeholder="닉네임을 입력해 주세요."
            />
            <div className="signUpTest">
              {showName ? (
                <p className="fail">
                  <Redicon />
                  {msgName}
                </p>
              ) : null}
              {successName ? (
                <p className="success">
                  <Greenicon />
                  {msgName}
                </p>
              ) : null}
            </div>
            <input
              type="email"
              onChange={setMail}
              onBlur={mailCheck}
              onKeyPress={onKeyPress}
              placeholder="메일을 입력해 주세요."
            />
            <div className="signUpTest">
              {showMail ? (
                <p className="fail">
                  <Redicon />
                  {msgMail}
                </p>
              ) : null}
              {successMail ? (
                <p className="success">
                  <Greenicon />
                  {msgMail}
                </p>
              ) : null}
              {show ? (
                <p className="fail">
                  <Redicon />
                  {msgMember}
                </p>
              ) : null}
            </div>
            <input
              type="password"
              name="password"
              onChange={setPassword}
              onBlur={passwordCheck}
              onKeyPress={onKeyPress}
              placeholder="비밀번호를 입력해 주세요."
            />
            <div className="signUpTest">
              {showPassword ? (
                <p className="fail">
                  <Redicon />
                  {msgPassword}
                </p>
              ) : null}
              {successPassword ? (
                <p className="success">
                  <Greenicon />
                  {msgPassword}
                </p>
              ) : null}
            </div>
            <input
              type="password"
              name="passwordConfirm"
              onChange={setPasswordConfirm}
              onBlur={passwordConfirmCheck}
              onKeyPress={onKeyPress}
              placeholder="입력한 비밀번호를 한번 더 입력해 주세요."
            />
            <div className="signUpTest">
              {showPasswordConfirm ? (
                <p className="fail">
                  <Redicon />
                  {msgPasswordConfirm}
                </p>
              ) : null}
              {successPasswordConfirm ? (
                <p className="success">
                  <Greenicon />
                  {msgPasswordConfirm}
                </p>
              ) : null}
            </div>
          </div>
          <div className="signUpButtonBox">
            <button className="signUpBtn" onClick={joinOnClickHandler}>
              회원가입
            </button>
            <div className="toSignInBox">
              <p className="signInText">기존 라이어게임 참가자 이신가요?</p>
              <p className="signInBtn fontBold" onClick={() => navigate('/')}>
                로그인
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
