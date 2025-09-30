import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 'Всі історії',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setActiveCategory } = filterSlice.actions;
export const selectActiveCategory = (state) => state.filter.activeCategory;
export default filterSlice.reducer;
