import axios from 'axios';
import { Cookies } from 'react-cookie';

const access_token = new Cookies().get('access_token');
const refresh_token = new Cookies().get('refresh_token');

// axios.defaults.headers.common['authorization'] = `${access_token}`;
// axios.defaults.headers.common['refresh-token'] = `${refresh_token}`;

const instance = axios.create({
  baseURL: 'https://haetae.shop',
  headers: {
    authorization: access_token,
    'refresh-token': refresh_token,
    'Content-Type': 'application/json',
  },
});

export const chat = axios.create({
  headers: {},
});

export default instance;
