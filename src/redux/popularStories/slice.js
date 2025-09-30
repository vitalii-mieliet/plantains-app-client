import { createSlice } from '@reduxjs/toolkit';
import { fetchPopularStories } from '../popularStories/operations.js';

const initialState = {
  items: [],
  currentStory: null,
  isLoading: false,
  error: null,
};

const storiesPopularSlice = createSlice({
  name: 'popularStories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularStories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data.data;
      })
      .addCase(fetchPopularStories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default storiesPopularSlice.reducer;
