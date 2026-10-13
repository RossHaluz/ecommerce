import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MyCar {
  modelName: string;
  name: string;
}

export interface MyCarState {
  car: MyCar | null;
}

const initialState: MyCarState = { car: null };

export const myCarSlice = createSlice({
  name: "myCar",
  initialState,
  reducers: {
    rememberCar(state, action: PayloadAction<MyCar>) {
      state.car = action.payload;
    },
    forgetCar(state) {
      state.car = null;
    },
  },
});

export const { rememberCar, forgetCar } = myCarSlice.actions;
export const myCarReducer = myCarSlice.reducer;
