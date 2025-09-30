import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import {
  clearAccessToken,
  setAccessToken,
} from '../../services/api/tokenStore';
import { AUTH_ENDPOINTS } from '../../constants/auth';

// REGISTER
export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      await api.post(AUTH_ENDPOINTS.REGISTER, credentials);
      const { name: _, ...loginCredentials } = credentials;
      await dispatch(loginUser(loginCredentials));
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post(AUTH_ENDPOINTS.LOGIN, credentials);

      setAccessToken(data.data.accessToken);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// REFRESH
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post(AUTH_ENDPOINTS.REFRESH);
      setAccessToken(data.data.accessToken);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Refresh failed');
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post(AUTH_ENDPOINTS.LOGOUT);
      clearAccessToken();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Refresh failed');
    }
  }
);

// GET GOOGLE AUTH URL
export const getGoogleAuthUrl = createAsyncThunk(
  'auth/googleOAuth',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(AUTH_ENDPOINTS.GET_GOOGLE_AUTH_URL);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Google Auth failed'
      );
    }
  }
);

// LOGIN WITH GOOGLE CODE
export const loginWithGoogleCode = createAsyncThunk(
  'auth/loginWithGoogle',
  async (code, { rejectWithValue }) => {
    try {
      const { data } = await api.post(AUTH_ENDPOINTS.LOGIN_WITH_GOOGLE, {
        code,
      });
      setAccessToken(data.data.accessToken);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login with Google failed'
      );
    }
  }
);
