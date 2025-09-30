import { createSlice } from '@reduxjs/toolkit';
import { fetchTravellerInfoById, fetchTravellers } from './operations';

const travelersSlice = createSlice({
  name: 'travelers',
  initialState: {
    list: [],
    page: 1,
    perPage: 8,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    loading: false,
    error: null,

    author: {
      name: null,
      avatar: null,
      status: 'idle',
      error: null,
      bio: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTravellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTravellers.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};
        const newData = payload.data || [];

        if (payload.page > 1) {
          state.list = [...state.list, ...newData];
        } else {
          state.list = newData;
        }

        state.page = payload.page || 1;
        state.perPage = payload.perPage || 10;
        state.totalItems = payload.totalItems || 0;
        state.totalPages = payload.totalPages || 0;
        state.hasNextPage = payload.hasNextPage || false;
        state.hasPreviousPage = payload.hasPreviousPage || false;
      })
      .addCase(fetchTravellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching travelers';
      })

      // === Author ===
      .addCase(fetchTravellerInfoById.pending, (state) => {
        state.author.status = 'loading';
        state.author.error = null;
      })
      .addCase(fetchTravellerInfoById.fulfilled, (state, action) => {
        state.author.status = 'succeeded';
        state.author.name = action.payload.name || null;
        state.author.avatar = action.payload.avatar || null;
        state.author.bio = action.payload.bio || null;
      })
      .addCase(fetchTravellerInfoById.rejected, (state, action) => {
        state.author.status = 'failed';
        state.author.error = action.payload || 'Error fetching author';
      });
  },
});

export default travelersSlice.reducer;
// mobil tablet 8 cart
//desktop 12 cart check in component Popular
