import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import instance from '../../../shared/Request';
import './style.scss';

function MyPageSignOut() {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="myPageSignOutBtn fontSemiBold"
        onClick={() => {
          const result = window.confirm('정말로 탈퇴하시겠습니까?');
          if (result) {
            instance.delete('lier/removal').then((res) => {
              alert(res.data.data);
            });
            sessionStorage.clear();
            new Cookies().remove('access_token');
            new Cookies().remove('refresh_token');
            navigate('/');
          }
        }}
      >
        회원탈퇴
      </button>
    </>
  );
}

export default MyPageSignOut;
