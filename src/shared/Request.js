import axios from 'axios';
import { Cookies } from 'react-cookie';

const access_token = new Cookies().get('access_token');
const refresh_token = new Cookies().get('refresh_token');

const instance = axios.create({

  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'authorization': access_token,
    'refresh-token': refresh_token,
    'Content-Type': 'application/json',
  },
});

export default instance;

export const setClientHeaders = (token) => {
  instance.interceptors.request.use(function (config) {
    config.headers['authorization'] = token.access;
    config.headers['refresh-token'] = token.refresh;
    return config;
  });
};