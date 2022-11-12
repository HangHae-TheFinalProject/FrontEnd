import axios from 'axios';
import { Cookies, useCookies } from 'react-cookie';
import instance from '../../shared/Request';

export default function FormLogOut() {
  const logOutClickHandler = async () => {
    await instance.post('https://haetae.shop/lier/logout');
  };

  return (
    <>
      <div>
        <button onClick={logOutClickHandler}>로그아웃</button>
      </div>
    </>
  );
}
