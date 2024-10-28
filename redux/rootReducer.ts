import { combineReducers } from "@reduxjs/toolkit";
import { authReducer, AuthState } from "./auth/slice";
import { OrderReducer, OrderState } from "./order/slice";
import { searchReducer, SearchState } from "./search/slice";
import { PersistPartial } from "redux-persist/es/persistReducer";

export interface RootState extends PersistPartial {
  order: OrderState; // Тип OrderState повинен відповідати вашому стану замовлень
  auth: AuthState; // Тип AuthState повинен відповідати вашому стану аутентифікації
  search: SearchState // Якщо у вас є тип для стану пошуку
}


const rootReducer = combineReducers({
  order: OrderReducer,
  auth: authReducer,
  search: searchReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
