import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { computeUrl } from '../computeUrl';
import { authAxios } from '../authAxios';

export const useUser = () => {
  const [user, setUser] = useState(null);

  const { data: userData, error: userError, refetch } = useQuery(
    'user',
    async () => {
      const result = await authAxios({
        method: 'get',
        url: computeUrl('/api/me'),
      });

      return result.data;
    },
    { enabled: false },
  );

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return [refetch, { setUser, userData: user, userError }];
};
