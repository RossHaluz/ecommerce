import { createSlice } from "@reduxjs/toolkit";

type EnumCustomizer = "grid" | "list";

interface InitialState {
  currentCustomizer: EnumCustomizer;
}

const initialState: InitialState = {
  currentCustomizer: "grid",
};

export const customizerSlice = createSlice({
  name: "customizer",
  initialState,
  reducers: {
    setCurrentCustomizer(state, action) {
      state.currentCustomizer = action.payload;
    },
  },
});

export const { setCurrentCustomizer } = customizerSlice.actions;
export const customizerReducer = customizerSlice.reducer;
