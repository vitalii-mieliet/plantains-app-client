import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchStoriesByAuthor = createAsyncThunk(
  'stories/fetchStoriesByAuthor',
  async ({ params, id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/stories/byauthor/${id}`, { params });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
