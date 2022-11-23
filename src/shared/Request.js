import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://haetae.shop',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;

export const setClientHeaders = (token) => {
  console.log('interceptor');
  instance.interceptors.request.use(function (config) {
    config.headers['authorization'] = token.access;
    config.headers['refresh-token'] = token.refresh;
    return config;
  });
};