import React, { useContext } from 'react';
import { UserContext } from '../contexts';

export const Chat = () => {
  const { user } = useContext(UserContext);

  return <div>Hello All {user.username}</div>;
};
