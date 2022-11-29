import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import instance from '../../../shared/Request';
import './style.scss';

function MyPageSignOff() {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="myPageSignOffBtn fontSemiBold"
        onClick={() => {
          instance.delete('lier/logout');
          sessionStorage.clear();
          new Cookies().remove('access_token');
          new Cookies().remove('refresh_token');
          navigate('/');
        }}
      >
        로그아웃
      </button>
    </>
  );
}

export default MyPageSignOff;
