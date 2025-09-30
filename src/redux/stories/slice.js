import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCategories,
  createStory,
  fetchStories,
  fetchStoryById,
} from './operations';

const initialState = {
  items: [],
  categories: [],
  currentStory: null,
  itemsStatus: 'idle',
  currentStoryStatus: 'idle',
  error: null,
  hasNextPage: false,
  totalPages: null,
  isLoading: false,
  totalItems: null,
  searchParams: {},

  author: {
    name: null,
    avatar: null,
    status: 'idle',
    error: null,
    bio: null,
  },
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    resetCurrentStory: (state) => {
      state.currentStory = null;
      state.currentStoryStatus = 'idle';
    },
    resetStories: (state) => {
      state.items = [];
    },
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- stories ---
      .addCase(fetchStories.pending, (state) => {
        state.isLoading = true;
        state.itemsStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsStatus = 'succeeded';
        state.items = [...state.items, ...action.payload.data];
        state.hasNextPage = action.payload.hasNextPage;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.isLoading = false;
        state.itemsStatus = 'failed';
        state.error = action.payload;
      })

      // story by id
      .addCase(fetchStoryById.pending, (state) => {
        state.currentStoryStatus = 'loading';
      })
      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.currentStoryStatus = 'succeeded';
        state.currentStory = action.payload;
      })
      .addCase(fetchStoryById.rejected, (state, action) => {
        state.currentStoryStatus = 'failed';
        state.error = action.payload;
      })

      // create story
      .addCase(createStory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload.data);
      })
      .addCase(createStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  applyFilters,
  resetCurrentStory,
  resetStories,
  setSearchParams,
} = storiesSlice.actions;
export default storiesSlice.reducer;
