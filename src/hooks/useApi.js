import { useEffect, useRef, useState } from 'react';
import { useAxios } from 'use-axios-client';
import { useAuth } from './useAuth';
import { computeUrl } from '../computeUrl';

export const useApi = path => {
  const { accessToken, getToken } = useAuth();
  const [isPending, setPending] = useState(false);

  const previousAccessToken = useRef(null);

  const { data, error, loading, refetch } = useAxios({
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

  return { data, error, loading, refetch };
};
