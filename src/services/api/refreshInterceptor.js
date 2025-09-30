import { setAccessToken } from './tokenStore';

import { AUTH_ENDPOINTS } from '../../constants/auth';
import { logoutUser } from '../../redux/auth/operations';

export function setupRefreshInterceptor(api, dispatch) {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      // refresh повернув 401 - logout
      // refresh request returne 401 - perform logout
      if (
        error.response?.status === 401 &&
        (originalRequest.url.includes(AUTH_ENDPOINTS.REFRESH) ||
          originalRequest.url.includes(AUTH_ENDPOINTS.LOGIN) ||
          originalRequest.url.includes(AUTH_ENDPOINTS.REGISTER))
      ) {
        return Promise.reject(error);
      }

      // перший 401 для запиту - пробуємо оновити токен
      // first 401 for request - try refreshing token
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { data } = await api.post(AUTH_ENDPOINTS.REFRESH);
          const newToken = data.data.accessToken;
          setAccessToken(newToken);

          // додаємо новий токен у хедери та повторюємо оригінальний запит
          // add new token to headers and retry the original request
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };

          return api(originalRequest);
        } catch (refreshError) {
          //  refresh  не вдався - logout
          // refresh failed - logout
          dispatch(logoutUser());
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
}
