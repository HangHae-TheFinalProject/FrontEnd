import axios from 'axios';
import { Cookies, useCookies } from 'react-cookie';
import instance from '../../shared/Request';

export default function FormLogOut() {
  const logOutClickHandler = async () => {
    try {
      await instance.post('https://haetae.shop/lier/logout');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <button onClick={logOutClickHandler}>로그아웃</button>
      </div>
    </>
  );
}
