import { useLazyApi } from './useLazyApi';

export const useContentApi = path => {
  const [getContent, { data: content, loading: contentLoading }] = useLazyApi(
    path,
  );

  return [getContent, { content, contentLoading }];
};
