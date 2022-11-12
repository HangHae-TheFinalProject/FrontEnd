import axios from 'axios';
import { Cookies, useCookies } from 'react-cookie';

export default function FormLogOut() {
  const [cookies, setCoocie] = useCookies('');
  //const authorization = Cookies.getcookie('Authorization');
  //const refresh_token = sessionStorage.getItem('Refresh-Token');
  console.log();

  const getCookie = () => {
    return cookies.get('Authorization');
  };
  const logOutClickHandler = (res) => {
    axios
      .get('https://haetae.shop/lier/logout', {
        authorization: `Bearer ${getCookie('is_login')}`,
      })
      .then((res) => {
        if (res.data) {
          console.log(res);
        } else {
          alert('로그아웃 실패');
        }
      });
  };

  return (
    <>
      <div>
        <button onClick={logOutClickHandler}>로그아웃</button>
      </div>
    </>
  );
}
