import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { LoginSocialGoogle } from 'reactjs-social-login';

import instance from '../../../shared/Request';
import { setClientHeaders } from '../../../shared/Request';

import './style.scss';

import { ReactComponent as GoogleLoginBtn } from '../../../images/svg/GoogleLoginBtn.svg';

export default function GoogleLogin() {
  const navigate = useNavigate();

  return (
    <div>
      <LoginSocialGoogle
        client_id={process.env.REACT_APP_GOOGLELOGIN_CLIENT_ID}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ provider, data }) => {
          instance
            .post('/lier/auth/login', null, {
              headers: {
                accesstoken: data.access_token,
              },
            })
            .then((res) => {
              alert('로그인에 성공하였습니다.');
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
              const access_token =
                res.request.getResponseHeader('authorization');
              const refresh_token =
                res.request.getResponseHeader('refresh-token');
              setClientHeaders({
                // interceptor
                access: access_token,
                refresh: refresh_token,
              });
              navigate('/lobby');
            });
        }}
        onReject={(error) => {
          alert('로그인에 실패하였습니다.');
        }}
      >
        <div className="googleLoginBtn">
          <GoogleLoginBtn />
          <span className="googleLogin">구글 로그인</span>
        </div>
      </LoginSocialGoogle>
    </div>
  );
}
