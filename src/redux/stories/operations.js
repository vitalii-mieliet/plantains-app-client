import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchStories = createAsyncThunk(
  'stories/fetch',
  async (args = {}, thunkAPI) => {
    try {
      const { page, perPage, category, sortBy, sortOrder } = args;

      const response = await api.get('/stories', {
        params: { page, perPage, category, sortBy, sortOrder },
      });

      const payload = response.data;

      return payload.data;
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

export const fetchCategories = createAsyncThunk(
  'stories/categories',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/stories/category');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createStory = createAsyncThunk(
  'stories/createStory',
  async (values, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('category', values.category);
      formData.append('article', values.article);
      formData.append('fullText', values.fullText);

      if (values.img) {
        formData.append('photo', values.img);
      }

      const response = await api.post('/stories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
