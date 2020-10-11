import axios from 'axios';
import { computeUrl } from './computeUrl';

export const authAxios = axios.create();

authAxios.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem('accessToken');

    return {
      ...config,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  },
  error => {
    Promise.reject(error);
  },
);

authAxios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const refreshToken = localStorage.getItem('refreshToken');

    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest.retry) {
      originalRequest.retry = true;
      const { data } = await axios({
        data: {
          token: refreshToken,
        },
        method: 'post',
        url: computeUrl('/auth/token'),
      });
      const { accessToken } = data.tokenData;

      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      return authAxios(originalRequest);
    }
    return Promise.reject(error);
  },
);
