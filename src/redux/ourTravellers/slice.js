import { createSlice } from '@reduxjs/toolkit';
import { fetchOurTravellers } from './operations';

const initialState = {
  items: [],
  pagination: {
    page: 1,
    perPage: 4,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  isLoading: false,
  error: null,
};

const ourTravellersSlice = createSlice({
  name: 'ourTravellers',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOurTravellers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOurTravellers.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, ...pagination } = action.payload;
        if (pagination.page === 1) {
          state.items = data;
        } else {
          state.items = [...state.items, ...data];
        }
        state.pagination = pagination;
      })
      .addCase(fetchOurTravellers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default ourTravellersSlice.reducer;

export const ourTravellersActions = ourTravellersSlice.actions;
