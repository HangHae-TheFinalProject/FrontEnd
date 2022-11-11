import qs from 'qs';
export default function GoogleButton() {
  const CLIENT_ID =
    '427813779712-mb0vr0dokapv51o49qvb4jmd8ne0nu3v.apps.googleusercontent.com';
  const AUTHORIZE_URI = 'https://accounts.google.com/o/oauth2/v2/auth';

  const queryStr = qs.stringify({
    client_id: CLIENT_ID,
    redirect_uri: window.location.href,
    response_type: 'token',
    scope: 'https://www.googleapis.com/auth/contacts.readonly',
  });

  const loginUrl = AUTHORIZE_URI + '?' + queryStr;

  return (
    <>
      <button>구글 로그인</button>
    </>
  );
}
