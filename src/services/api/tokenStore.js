import { api } from '.';

export const setAccessToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const clearAccessToken = () => {
  delete api.defaults.headers.common.Authorization;
};

export const getAccessToken = () => {
  return api.defaults.headers.common.Authorization;
};
