import { useLazyAxios } from 'use-axios-client';
import { useAuth } from './useAuth';

const environment = process.env.REACT_APP_ENV;
const serverUrl = process.env.REACT_APP_SERVER_URL;

const computeUrl = path => {
  if (environment === 'development') {
    return path;
  }
  return `${serverUrl}${path}`;
};

export const useUser = () => {
  const { accessToken } = useAuth();

  const [
    getUser,
    { data: userData, error: userError, loading: userLoading },
  ] = useLazyAxios({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    url: computeUrl('/api/me'),
  });

  return [getUser, { userData, userError, userLoading }];
};
