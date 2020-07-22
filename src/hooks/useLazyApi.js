import { useEffect, useRef, useState } from 'react';
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

export const useLazyApi = path => {
  const { accessToken, getToken } = useAuth();
  const [isPending, setPending] = useState(false);

  const previousAccessToken = useRef(null);

  const [getData, { data, error, loading, refetch }] = useLazyAxios({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    url: computeUrl(path),
  });

  useEffect(() => {
    if (error?.response.status === 403 && !isPending) {
      previousAccessToken.current = accessToken;
      setPending(true);
      getToken();
    }
  }, [accessToken, error, getToken, isPending]);

  useEffect(() => {
    if (accessToken !== previousAccessToken.current && isPending) {
      refetch();
      setPending(false);
    }
  }, [accessToken, isPending, refetch]);

  return [getData, { data, error, loading }];
};