import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { OrderReducer } from "./order/slice";

const rootReducer = combineReducers({
  order: OrderReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
