import axios, { AxiosInstance } from 'axios';
import nookies from 'nookies';

const axiosObj = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'X-Token': nookies.get(null).token || null,
  },
});

const http: SetTokenHtttp = axiosObj as SetTokenHtttp;

http.setToken = function (token) {
  if (token) {
    this.defaults.headers['X-Token'] = token;
  } else {
    delete this.defaults.headers['X-Token'];
  }
};

http.controller = () => new AbortController();

export default http;
