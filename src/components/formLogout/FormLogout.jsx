import { useNavigate } from 'react-router-dom';
import instance from '../../shared/Request';

export default function FormLogout() {
  const nav = useNavigate();
  const logOutClickHandler = async () => {
    try {
      await instance.post('https://haetae.shop/lier/logout');
      nav('/signin');
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
