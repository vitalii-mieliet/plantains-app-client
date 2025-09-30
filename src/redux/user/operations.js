import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { getAccessToken } from '../../services/api/tokenStore';

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      if (!token) {
        return rejectWithValue('No access token');
      }

      const res = await api.get('/users/info');
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Не вдалося завантажити профіль'
      );
    }
  }
);

export const fetchSavedStories = createAsyncThunk(
  'user/fetchSavedStories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/users/saved-stories');
      return data.data || {};
    } catch (err) {
      if (err.response?.status === 404) {
        return {};
      }
      return rejectWithValue(
        err.response?.data?.message ||
          'Не вдалося завантажити збережені історії'
      );
    }
  }
);

export const fetchCreatedStories = createAsyncThunk(
  'user/fetchCreatedStories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/users/created-stories');
      return data.data;
    } catch (err) {
      if (err.response?.status === 404) {
        return {};
      }
      return rejectWithValue(
        err.response?.data?.message || 'Не вдалося завантажити створені історії'
      );
    }
  }
);

export const saveStory = createAsyncThunk(
  'user/saveStory',
  async (storyId, { rejectWithValue }) => {
    try {
      await api.post(`/users/save-story/${storyId}`);
      return storyId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Не вдалося зберегти'
      );
    }
  }
);

export const unsaveStory = createAsyncThunk(
  'user/unsaveStory',
  async (storyId, { rejectWithValue }) => {
    try {
      await api.delete(`/users/save-story/${storyId}`);
      return storyId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Не вдалося видалити'
      );
    }
  }
);

export const onboardingUser = createAsyncThunk(
  'user/completeOnboarding',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.patch('/users/onboarding', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // якщо є JWT cookie
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to complete onboarding'
      );
    }
  }
);
