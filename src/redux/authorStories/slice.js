import { createSlice } from '@reduxjs/toolkit';
import { fetchStoriesByAuthor } from './operation';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  hasNextPage: false,
  totalPages: null,
  totalItems: null,
  currentPage: null,
  currentAuthorId: null,
};

const authorSroriesSlice = createSlice({
  name: 'authorSrories',
  initialState,
  reducers: {
    resetStories: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoriesByAuthor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStoriesByAuthor.fulfilled, (state, action) => {
        const { data, hasNextPage, totalPages, totalItems, page, id } =
          action.payload;

        const isNewAuthor = state.currentAuthorId !== id;
        const isFirstPage = page === 1;

        if (isFirstPage || isNewAuthor) {
          state.items = data;
        } else {
          state.items = [...state.items, ...data];
        }

        state.currentPage = page;
        state.currentAuthorId = id;

        state.isLoading = false;
        state.error = null;
        state.hasNextPage = hasNextPage;
        state.totalPages = totalPages;
        state.totalItems = totalItems;
      })
      .addCase(fetchStoriesByAuthor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStories } = authorSroriesSlice.actions;
export default authorSroriesSlice.reducer;
