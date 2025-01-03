import { createSlice } from "@reduxjs/toolkit";
import { getModels } from "./operetions";

const initialState: any = {
  isLoading: false,
  models: [],
  error: null,
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getModels.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getModels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.models = action.payload;
      })
      .addCase(getModels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const modelReducer = modelSlice.reducer;
