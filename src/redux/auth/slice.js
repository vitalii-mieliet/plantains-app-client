import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  registerUser,
  refreshUser,
  getGoogleAuthUrl,
  loginWithGoogleCode,
  sendResetEmail,
  resetPassword,
} from './operations';
import { fetchCurrentUser } from '../user/operations';

const initialState = {
  isLoading: false,
  isInitialized: false,
  isRefreshing: false,
  isLoggedIn: false,
  error: null,
  url: null,
  emailSent: false,
  resetSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // --- Register ---
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // --- Login ---
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })

      // --- Refresh ---
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state) => {
        state.isRefreshing = false;
        state.isInitialized = true;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isInitialized = true;
        state.error = action.payload;
      })

      // --- Fetch user ---
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // --- Get Google OAuth URL ---
      .addCase(getGoogleAuthUrl.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGoogleAuthUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.url = action.payload.url;
      })
      .addCase(getGoogleAuthUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // --- Login with Google ---
      .addCase(loginWithGoogleCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogleCode.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginWithGoogleCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // --- Send Reset Password Email ---
      .addCase(sendResetEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.emailSent = false;
      })
      .addCase(sendResetEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.emailSent = true;
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.emailSent = false;
      })

      // --- Reset Password ---
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.resetSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.resetSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.resetSuccess = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
