import { useNavigate } from 'react-router-dom';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login';
export default function GoogleLogin() {
  const nav = useNavigate();
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
          onResolve={({ provider, data }) => {
            nav('/');
            console.log('요깅', provider, data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          {' '}
          <GoogleLoginButton />
        </LoginSocialGoogle>
      </div>
    </>
  );
}
