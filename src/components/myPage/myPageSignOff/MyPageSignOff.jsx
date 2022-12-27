import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import instance from '../../../shared/Request';

import myPageSignOff from './style.module.scss';

function MyPageSignOff() {
  const navigate = useNavigate();

  return (
    <>
      <button
        className={`${myPageSignOff.myPageSignOffBtn} fontSemiBold`}
        onClick={() => {
          const result = window.confirm('로그아웃 하시겠습니까?');
          if (result) {
            instance.post('lier/logout').then((res) => {
              sessionStorage.clear();
              new Cookies().remove('access_token');
              new Cookies().remove('refresh_token');
              navigate('/');
            });
          }
        }}
      >
        로그아웃
      </button>
    </>
  );
}

export default MyPageSignOff;
