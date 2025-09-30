import { configureStore } from '@reduxjs/toolkit';
import listenerMiddleware from './listenerMiddleware';
import rootReducer from './rootReducer';
import { setupRefreshInterceptor } from '../services/api/refreshInterceptor';
import { api } from '../services/api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
setupRefreshInterceptor(api, store.dispatch);
