import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { AuthContext, UserContext } from '../contexts';
import './NavBar.css';

export const NavBar = () => {
  const navigate = useNavigate();
  const { getLogout, isLoggedIn } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn) {
      setUser();
    }
  }, [isLoggedIn, setUser]);

  const renderToolbarOptions = () => {
    if (isLoggedIn) {
      return (
        <div>
          <Button color="inherit" onClick={() => getLogout()} type="button">
            Logout
          </Button>
        </div>
      );
    }

    return (
      <div>
        <Button color="inherit" onClick={() => navigate('/register')}>
          Register
        </Button>
        <Button color="inherit" onClick={() => navigate('/login')}>
          Login
        </Button>
      </div>
    );
  };

  return (
    <AppBar className="nav-bar" position="static">
      <Toolbar className="toolbar">
        {renderToolbarOptions()}
        <a
          href="https://github.com/jpangelle/twid"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="github-logo"
            className="github-logo"
            src="https://i.imgur.com/9yVi87Z.png"
          />
        </a>
      </Toolbar>
    </AppBar>
  );
};
