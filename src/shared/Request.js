import axios from 'axios';
import { Cookies } from 'react-cookie';
// import useCookies from 'react-cookie';

// const access_token = new Cookies().get('access_token');
// const refresh_token = new Cookies().get('refresh_token');

// const [token] = useCookies();

let instance = axios.create({

  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'authorization': new Cookies().get('access_token'),
    'refresh-token': new Cookies().get('refresh_token'),
    'Content-Type': 'application/json',
  },
});

export default instance;

export const noheaderInstance = axios.create({

  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setClientHeaders = () => {

  instance.interceptors.request.use(function (config) {
    config.headers['authorization'] = new Cookies().get('access_token');
    config.headers['refresh-token'] = new Cookies().get('refresh_token');
    return config;
  });
};