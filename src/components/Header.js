import React, { useContext, useEffect } from 'react';
import { AuthContext, UserContext } from '../contexts';

export const Header = () => {
  const { getLogout, isLoggedIn } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn) {
      setUser();
    }
  }, [isLoggedIn, setUser]);

  return (
    <div>
      Welcome
      {isLoggedIn && (
        <button onClick={() => getLogout()} type="button">
          Logout
        </button>
      )}
    </div>
  );
};
