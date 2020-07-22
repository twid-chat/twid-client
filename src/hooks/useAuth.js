import { useEffect, useState } from 'react';
import { useLazyAxios } from 'use-axios-client';

const environment = process.env.REACT_APP_ENV;
const serverUrl = process.env.REACT_APP_SERVER_URL;

const computeUrl = path => {
  if (environment === 'development') {
    return path;
  }
  return `${serverUrl}${path}`;
};

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const [
    getLogin,
    { data: loginData, error: loginError, loading: loginLoading },
  ] = useLazyAxios({
    method: 'POST',
    url: computeUrl('/auth/login'),
  });

  const [
    getRegister,
    { data: registerData, error: registerError, loading: registerLoading },
  ] = useLazyAxios({
    method: 'POST',
    url: computeUrl('/auth/register'),
  });

  const [
    getLogout,
    { data: logoutData, loading: logoutLoading },
  ] = useLazyAxios({
    data: {
      token:
        loginData?.refreshToken || registerData?.refreshToken || refreshToken,
    },
    method: 'POST',
    url: computeUrl('/auth/logout'),
  });

  const [getToken, { data: tokenData, error: tokenError }] = useLazyAxios({
    data: {
      token:
        loginData?.refreshToken || registerData?.refreshToken || refreshToken,
    },
    method: 'POST',
    url: computeUrl('/auth/token'),
  });

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
