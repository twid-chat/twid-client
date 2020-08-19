import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { Chat } from './Chat';
import { Loader } from './Loader';
import { Login } from './Login';
import { NavBar } from './NavBar';
import { NotFound } from './NotFound';
import { Register } from './Register';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { useAuth, useUser } from '../hooks';
import { AuthContext, SocketContext, UserContext } from '../contexts';
import './App.css';

let socket;

export const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    accessToken,
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
    registerError,
    registerLoading,
    tokenError,
  } = useAuth();
  const [getUser, { userData, userError }] = useUser();

  // app initially loads, check for valid
  // access token if user is not logged in
  useEffect(() => {
    if (!loginData && !logoutData && accessToken) {
      getToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken, loginData, logoutData]);

  // if the request for a token fails,
  // set the loading status to false
  useEffect(() => {
    if (tokenError || !accessToken) {
      setLoading(false);
    }
  }, [accessToken, tokenError]);

  // if a user is logged in and an accessToken
  // is present, fetch for the user data
  useEffect(() => {
    if (isLoggedIn && accessToken) {
      getUser();
      socket = io('http://localhost:4002', {
        path: '/socket',
        query: {
          accessToken,
        },
      });
    }
  }, [accessToken, getUser, isLoggedIn]);

  // once the userData returns, set the user
  // state and set the loading status to false
  useEffect(() => {
    if (userData) {
      setUser(userData);
      setLoading(false);
    } else if (userError) {
      setLoading(false);
    }
  }, [userData, userError]);

  if (logoutLoading) {
    return <Loader size={64} />;
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        getLogin,
        getLogout,
        getRegister,
        isLoggedIn,
        loginError,
        loginLoading,
        registerError,
        registerLoading,
      }}
    >
      <UserContext.Provider value={{ setUser, user }}>
        <SocketContext.Provider value={{ socket }}>
          {loading ? (
            <Loader size={64} />
          ) : (
            <Router>
              <NavBar />
              <Routes>
                <PrivateRoute path="/" element={<Chat />} />
                <PublicRoute path="/login" element={<Login />} />
                <PublicRoute path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          )}
        </SocketContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};
