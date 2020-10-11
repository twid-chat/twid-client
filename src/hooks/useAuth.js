import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { computeUrl } from '../computeUrl';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const [
    getLogin,
    { data: loginData, error: loginError, isLoading: loginLoading },
  ] = useMutation(async credentials => {
    const result = await axios({
      data: credentials,
      method: 'post',
      url: computeUrl('/auth/login'),
    });
    return result.data;
  });

  const [
    getRegister,
    { data: registerData, error: registerError, isLoading: registerLoading },
  ] = useMutation(async credentials => {
    const result = await axios({
      data: credentials,
      method: 'post',
      url: computeUrl('/auth/register'),
    });
    return result.data;
  });

  const [
    getLogout,
    { data: logoutData, isLoading: logoutLoading },
  ] = useMutation(async () => {
    const result = await axios({
      data: {
        token:
          loginData?.refreshToken || registerData?.refreshToken || refreshToken,
      },
      method: 'post',
      url: computeUrl('/auth/logout'),
    });
    return result.data;
  });

  const [getToken, { data: tokenData, error: tokenError }] = useMutation(
    async () => {
      const result = await axios({
        data: {
          token:
            loginData?.refreshToken ||
            registerData?.refreshToken ||
            refreshToken,
        },
        method: 'post',
        url: computeUrl('/auth/token'),
      });
      return result.data;
    },
  );

  // user registers and access token is requested
  useEffect(() => {
    if (registerData?.refreshToken) {
      getToken();
      localStorage.setItem('refreshToken', registerData.refreshToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerData]);

  // user logs in and access token is requested
  useEffect(() => {
    if (loginData?.refreshToken) {
      getToken();
      localStorage.setItem('refreshToken', loginData.refreshToken);
    }
  }, [getToken, loginData]);

  // user logs out and localStorage is cleared
  useEffect(() => {
    if (logoutData) {
      setIsLoggedIn(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }, [logoutData, logoutLoading]);

  // access token expires and new accessToken is set in localStorage
  useEffect(() => {
    if (tokenData) {
      setIsLoggedIn(true);
      localStorage.setItem('accessToken', tokenData.accessToken);
    }
  }, [tokenData]);

  return {
    accessToken: tokenData?.accessToken || accessToken,
    getLogin,
    getLogout,
    getRegister,
    getToken,
    isLoggedIn,
    loginData,
    loginError,
    loginLoading,
    logoutData,
    logoutLoading,
    registerData,
    registerError,
    registerLoading,
    tokenError,
  };
};
