import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
  searchQuery: string;
  searchItems: any;
}

const initialState = {
  searchQuery: "",
  searchItems: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
