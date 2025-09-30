export const selectPopularStories = (state) => state.popularStories.items;
export const selectPopularStoriesLoading = (state) =>
  state.popularStories.isLoading;
export const selectPopularStoriesError = (state) => state.popularStories.error;
