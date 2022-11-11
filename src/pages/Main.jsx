import axios from "axios";
import { useCookies } from 'react-cookie';


function Main() {
  const [cookie, setCookie, removeCookie] = useCookies();

  const temp = {
    email: 'wlstpgns51@naver.com',
    password: 'wls1234!'
  }

  const login = () => {
    axios.post('https://haetae.shop/lier/login', temp)
      .then(res => {
        setCookie('token', res.request.getResponseHeader('authorization'));
        setCookie('refreshtoken', res.request.getResponseHeader('refresh-token'));
  })
}


return <>
  <h1>Main</h1>
  <input type='button' onClick={login} value='login' />
</>
}

export default Main;