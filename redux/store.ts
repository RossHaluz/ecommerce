"use client";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { useDispatch } from "react-redux";
import { authReducer, AuthState } from "./auth/slice";
import { OrderReducer, OrderState } from "./order/slice";
import { searchReducer } from "./search/slice";
import { PersistPartial } from "redux-persist/es/persistReducer";

const persistAuth = {
  key: "userDetails",
  whitelist: ["userContactDetails"],
  storage,
};

const persistOrder = {
  key: "orderItems",
  whitelist: ["orderItems", 'orderDetails'],
  storage,
};

const persistedAuthReducer = persistReducer<AuthState & PersistPartial>(persistAuth, authReducer);
const persistedOrderReducer = persistReducer<OrderState & PersistPartial>(persistOrder, OrderReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    order: persistedOrderReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const persistor = persistStore(store);
