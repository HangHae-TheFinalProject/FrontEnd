import axios from 'axios';
import { Cookies } from 'react-cookie';

const access_token = new Cookies().get('access_token');
const refresh_token = new Cookies().get('refresh_token');

axios.defaults.headers.common['Authorization'] = `${access_token}`;
axios.defaults.headers.common['Refresh-Token'] = `${refresh_token}`;

const instance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chat = axios.create({
  headers: {},
});

export default instance;
