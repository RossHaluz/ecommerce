import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./operetions";

const initialState: any = {
  categories: [],
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        (state.isLoading = false), (state.categories = action.payload);
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
