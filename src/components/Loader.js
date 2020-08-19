import React from 'react';
import { CircularProgress } from '@material-ui/core';

export const Loader = ({ size }) => (
  <div className="loading">
    <CircularProgress size={size} />
  </div>
);
