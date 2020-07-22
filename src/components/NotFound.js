import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from '@material-ui/icons';
import './NotFound.css';

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="not-found">
      <p>Oops! This page does not exist. Redirecting...</p>
      <Search />
    </div>
  );
};
