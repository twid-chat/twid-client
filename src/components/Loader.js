import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loader = () => {
  return (
    <div className="loading">
      <CircularProgress />
    </div>
  );
};

export default Loader;
