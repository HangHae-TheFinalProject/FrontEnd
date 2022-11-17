import { useState } from 'react';
import instance from '../../shared/Request';
import useInput from '../../hooks/useInput';
import './style.scss';

export default function FormSignUp() {

  const [name, setName] = useInput('');
  const [mail, setMail] = useInput('');
  const [password, setPassword] = useInput('');
  const [passwordConfirm, setPasswordConfirm] = useInput('');

  const [msgName, setMsgName] = useState('');
  const [msgMail, setMsgMail] = useState('');
  const [msgPassword, setMsgPassword] = useState('');
  const [msgPasswordConfirm, setMsgPasswordConfirm] = useState('');

  const joinOnClickHandler = () => {
    if (!(nameCheck() && mailCheck() && passwordCheck() && passwordConfirmCheck())) {
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
        } else {
          alert(res.data.error);
        }
      });
  };

  const nameCheck = () => {
    if (name) setMsgName('');
    else setMsgName('이름을 입력해주세요.');

    return name;
  }

  const mailCheck = () => {
    const result = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(mail);

    if (result) setMsgMail('');
    else setMsgMail('메일 형식이 아닙니다.');

    return result;
  }

  const passwordCheck = () => {
    const result = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/.test(password);

    if (result) setMsgPassword('');
    else setMsgPassword('비밀번호 형식이 아닙니다.');

    return result;
  }

  const passwordConfirmCheck = () => {
    const result = password === passwordConfirm;

    if (result) setMsgPasswordConfirm('');
    else setMsgPasswordConfirm('비밀번호가 일치하지 않습니다.');

    return result;
  }

  return (
    <>
      <div className="signUpBox">
        <div className="divSignInBox">
          <div className="divTitleBox">
            <h2>회원가입</h2>
          </div>

          <div className="divInputBox">
            <input
              type="text"
              onChange={setName}
              onBlur={nameCheck}
              placeholder="이름을 입력하세요"
            ></input>
            <p>{msgName}</p>
          </div>
          <div className="divInputBox">
            <input
              type="text"
              onChange={setMail}
              onBlur={mailCheck}
              placeholder="메일을 입력하세요"
            ></input>
            <p>{msgMail}</p>
          </div>

          <div className="divInputBox">
            <input
              type="password"
              name="password"
              onBlur={passwordCheck}
              placeholder="비밀번호를 입력하세요"
              onChange={setPassword}
            ></input>
            <p>{msgPassword}</p>
          </div>
          <div className='divInputBox'>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              onBlur={passwordConfirmCheck}
              onChange={setPasswordConfirm}
            ></input>
            <p>{msgPasswordConfirm}</p>
          </div>

          <div className="divSignUpBox">
            <button onClick={joinOnClickHandler}>회원가입</button>
            <div className="divLoginText">
              <p className="loginText">기존 라이어게임 참가자이신가요?</p>
              <a href='/'>
                <p className="loginBtn">
                  로그인
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
