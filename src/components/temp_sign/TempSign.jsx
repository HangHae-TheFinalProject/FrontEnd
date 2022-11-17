import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import './style.scss';

const TempSign = () => {
  const [cookie, setCookie] = useCookies();

  const [signUp, setSignUp] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const onSignUpHandler = (e) => {
    const { name, value } = e.target;
    setSignUp({ ...signUp, [name]: value });
  };

  const onLoginHandler = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  // 채팅 임시 회원가입
  const tempSignUp = async (payload) => {
    try {
      const { data } = await axios.post(
        'http://13.125.214.86:8080/lier/signup',
        payload
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 채팅 임시 로그인
  const tempLogin = async (payload) => {
    try {
      await axios
        .post('http://13.125.214.86:8080/lier/login', payload)
        .then((response) => {
          setCookie(
            'access_token',
            response.request.getResponseHeader('authorization')
          );
          setCookie(
            'refresh_token',
            response.request.getResponseHeader('refresh-token')
          );
          sessionStorage.setItem('nickname', response.data.data.nickname);
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="tempSign">
        <div className="signUp">
          <div>임시 회원가입</div>
          <input
            type="email"
            name="email"
            value={signUp.email}
            onChange={onSignUpHandler}
            placeholder="signup email"
          />
          <input
            type="text"
            name="nickname"
            value={signUp.nickname}
            onChange={onSignUpHandler}
            placeholder="signup nickname"
          />
          <input
            type="password"
            name="password"
            value={signUp.password}
            onChange={onSignUpHandler}
            placeholder="signup password"
          />
          <input
            type="password"
            name="passwordConfirm"
            value={signUp.passwordConfirm}
            onChange={onSignUpHandler}
            placeholder="signup passwordconfirm"
          />
          <button
            onClick={() =>
              tempSignUp({
                email: signUp.email,
                nickname: signUp.nickname,
                password: signUp.password,
                passwordConfirm: signUp.passwordConfirm,
              })
            }
          >
            회원가입
          </button>
        </div>
        <div className="login">
          <div>임시 로그인</div>
          <input
            type="email"
            name="email"
            value={login.email}
            onChange={onLoginHandler}
            placeholder="login email"
          />
          <input
            type="password"
            name="password"
            value={login.password}
            onChange={onLoginHandler}
            placeholder="login password"
          />
          <button
            onClick={() =>
              tempLogin({
                email: login.email,
                password: login.password,
              })
            }
          >
            로그인
          </button>
        </div>
      </div>
    </>
  );
};

export default TempSign;
