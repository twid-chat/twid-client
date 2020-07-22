import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AuthContext } from '../contexts';

export const PublicRoute = ({ ...props }) => {
  const { isLoggedIn } = useContext(AuthContext);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return isLoggedIn ? <Navigate to="/" /> : <Route {...props} />;
};
