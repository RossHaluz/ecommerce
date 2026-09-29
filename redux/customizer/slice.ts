import { createSlice } from "@reduxjs/toolkit";

type EnumCustomizer = "grid" | "list";
export type DisplayCurrency = "USD" | "UAH";

interface InitialState {
  currentCustomizer: EnumCustomizer;
  currency: DisplayCurrency;
}

const initialState: InitialState = {
  currentCustomizer: "grid",
  // Каталог веде ціни в доларах (перевірено: GA currency: "USD" + масштаб
  // цін) — дефолт показу теж USD; UAH лише коли покупець сам перемкне.
  currency: "USD",
};

export const customizerSlice = createSlice({
  name: "customizer",
  initialState,
  reducers: {
    setCurrentCustomizer(state, action) {
      state.currentCustomizer = action.payload;
    },
    setCurrency(state, action: { payload: DisplayCurrency }) {
      state.currency = action.payload;
    },
  },
});

export const { setCurrentCustomizer, setCurrency } = customizerSlice.actions;
export const customizerReducer = customizerSlice.reducer;
