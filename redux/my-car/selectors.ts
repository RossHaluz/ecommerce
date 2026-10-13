import type { MyCar } from "./slice";

export const selectMyCar = (state: { myCar: { car: MyCar | null } }) => state.myCar.car;
