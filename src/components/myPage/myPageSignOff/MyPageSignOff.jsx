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
          const result = window.confirm('로그아웃 하시겠습니까?');
          if (result) {
            instance.delete('lier/logout');
            sessionStorage.clear();
            new Cookies().remove('access_token');
            new Cookies().remove('refresh_token');
            navigate('/');
          }
        }}
      >
        로그아웃
      </button>
    </>
  );
}

export default MyPageSignOff;
