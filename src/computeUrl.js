const environment = process.env.REACT_APP_ENV;
const serverUrl = process.env.REACT_APP_SERVER_URL;

export const computeUrl = path => {
  if (environment === 'development') {
    return path;
  }
  return `${serverUrl}${path}`;
};

export const computeSocketUrl = () => {
  if (environment === 'development') {
    return 'http://localhost:4002';
  }
  return serverUrl;
};
