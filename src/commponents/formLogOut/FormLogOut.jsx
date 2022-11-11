import axios from 'axios';

export default function FormLogOut() {
  const logOutClickHandler = (props) => {
    axios.get('https://haetae.shop/lier/logout').then((res) => {
      if (res.data) {
        console.log(res);
        props.history.push('/login');
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
