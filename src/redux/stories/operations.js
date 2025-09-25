import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchStories = createAsyncThunk(
  'stories/fetch', 
  async ({ page = 1, perPage = 9 }, thunkAPI) => {
    try {
      const response = await api.get('/stories', {
        params: { page, perPage },
      }); 
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchStoryById = createAsyncThunk(
  'stories/fetchById',
  async (storyId, thunkAPI) => {
    try {
      const response = await api.get(`/stories/story/${storyId}`);
      return response.data.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);