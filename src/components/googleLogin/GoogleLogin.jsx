import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { ReactComponent as GoogleIcon } from '../../images/svg/GoogleIcon.svg';
import './style.scss';
export default function GoogleLogin() {
  const nav = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();

  return (
    <>
      <div>
        <LoginSocialGoogle
          client_id={
            '834758423855-a5n2vtmbhvf4n4rujq9k9rdtucpud3cf.apps.googleusercontent.com'
          }
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={async ({ provider, data }) => {
            await axios
              .post('https://haetae.shop/lier/auth/login', null, {
                headers: {
                  accesstoken: data.access_token,
                },
              })
              .then((res) => {
                setCookie(
                  'access_token',
                  res.request.getResponseHeader('authorization')
                );
                setCookie(
                  'refresh_token',
                  res.request.getResponseHeader('refresh-token')
                );
              });

            nav('/lobby');
          }}
          onReject={(error) => {
            console.log('실패', error);
          }}
        >
          <button className="googleBtn">
            <GoogleIcon className="icon" />
            <h4 className="googleLogin">구글로그인</h4>
          </button>
        </LoginSocialGoogle>
      </div>
    </>
  );
}
