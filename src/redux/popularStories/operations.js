import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchPopularStories = createAsyncThunk(
  'stories/fetchPopular',
  async (params = {}, thunkAPI) => {
    try {
      const defaultSortingParams = {
        sortBy: 'rate',
        sortOrder: 'desc',
      };
      const finalParams = {
        ...params,
        ...defaultSortingParams,
      };
      const response = await api.get('/stories', { params: finalParams });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
