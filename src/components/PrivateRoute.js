import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import Loader from './Loader';
import { AuthContext, UserContext } from '../contexts';

export const PrivateRoute = ({ ...props }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  if (isLoggedIn) {
    return user ? (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Route {...props} />
    ) : (
      <Loader size={64} />
    );
  }

  return <Navigate to="/login" />;
};
