import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { AuthContext, UserContext } from '../contexts';

export const PrivateRoute = ({ ...props }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  if (isLoggedIn) {
    return user ? (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Route {...props} />
    ) : (
      <div className="loading">
        <CircularProgress size={64} />
      </div>
    );
  }

  return <Navigate to="/login" />;
};
