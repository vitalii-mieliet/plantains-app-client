import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchOurTravellers = createAsyncThunk(
  'travelers/fetchOurTravellers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/stories/authors', {
        params,
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
