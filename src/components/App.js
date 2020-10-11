import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Chat } from './Chat';
import { Loader } from './Loader';
import { Login } from './Login';
import { NavBar } from './NavBar';
import { NotFound } from './NotFound';
import { Register } from './Register';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { useSession } from '../hooks';
import { AuthContext, SocketContext, UserContext } from '../contexts';
import './App.css';

export const App = () => {
  const {
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
  } = useSession();

  if (logoutLoading) {
    return <Loader size={64} />;
  }

  return (
    <AuthContext.Provider
      value={{
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
      <UserContext.Provider value={{ setUser, userData }}>
        <SocketContext.Provider value={{ socket }}>
          {appLoading ? (
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
