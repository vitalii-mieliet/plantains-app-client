import { createListenerMiddleware } from '@reduxjs/toolkit';
import { loginUser, loginWithGoogleCode, refreshUser } from './auth/operations';
import { fetchCurrentUser } from './user/operations';

const listenerMiddleware = createListenerMiddleware();
const startAppListening = listenerMiddleware.startListening;

// після логіну підтягнути профіль
// after login fetch profile
startAppListening({
  actionCreator: loginUser.fulfilled,
  effect: async (_, listenerApi) => {
    await listenerApi.dispatch(fetchCurrentUser());
  },
});

startAppListening({
  actionCreator: refreshUser.fulfilled,
  effect: async (_, listenerApi) => {
    await listenerApi.dispatch(fetchCurrentUser());
  },
});

startAppListening({
  actionCreator: loginWithGoogleCode.fulfilled,
  effect: async (_, listenerApi) => {
    await listenerApi.dispatch(fetchCurrentUser());
  },
});

export default listenerMiddleware;
