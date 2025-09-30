import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchTravellers = createAsyncThunk(
  'travelers/fetchTravellers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/stories/authors', {
        params,
      });

      return response.data.data; // повертає { data, page, totalPages ... }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// --- fetch author info by authorId ---
export const fetchTravellerInfoById = createAsyncThunk(
  'stories/fetchTravellerInfoById',
  async (userId, thunkAPI) => {
    try {
      const response = await api.get(`/stories/authors/${userId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
