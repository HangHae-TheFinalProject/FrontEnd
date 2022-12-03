import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { LoginSocialGoogle } from 'reactjs-social-login';

import { ReactComponent as GoogleLoginBtn } from '../../../images/svg/GoogleLoginBtn.svg';
import instance from '../../../shared/Request';

import './style.scss';

export default function GoogleLogin() {
  const navigate = useNavigate();

  return (
    <div>
      <LoginSocialGoogle
        client_id={
          '834758423855-a5n2vtmbhvf4n4rujq9k9rdtucpud3cf.apps.googleusercontent.com'
        }
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
            });
          navigate('/lobby');
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
