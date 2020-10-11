import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './useAuth';
import { useUser } from './useUser';

import { computeSocketUrl } from '../computeUrl';

let socket;

export const useSession = () => {
  const [appLoading, setAppLoading] = useState(true);

  const [getUser, { setUser, userData }] = useUser();

  const {
    accessToken,
    getLogin,
    getLogout,
    getRegister,
    getToken,
    isLoggedIn,
    loginError,
    loginLoading,
    logoutLoading,
    registerError,
    registerLoading,
    tokenError,
  } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      getUser();
      socket = io(computeSocketUrl(), {
        path: '/socket',
        query: {
          accessToken,
        },
      });
    } else if (tokenError) {
      setAppLoading(false);
    } else {
      getToken();
    }
  }, [accessToken, getToken, getUser, isLoggedIn, tokenError]);

  useEffect(() => {
    if (userData) {
      setAppLoading(false);
    }
  }, [userData]);

  return {
    appLoading,
    getLogin,
    getLogout,
    getRegister,
    isLoggedIn,
    loginError,
    loginLoading,
    logoutLoading,
    registerError,
    registerLoading,
    setUser,
    socket,
    userData,
  };
};
