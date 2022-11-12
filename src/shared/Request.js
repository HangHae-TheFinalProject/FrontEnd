import axios from 'axios';
import { Cookies } from 'react-cookie';

const access_token = new Cookies().get('token');
const refresh_token = new Cookies().get('refreshtoken');

axios.defaults.headers.common['authorization'] = `${access_token}`;
axios.defaults.headers.common['refresh-token'] = `${refresh_token}`;

const instance = axios.create({
  // baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
