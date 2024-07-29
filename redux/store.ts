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

import { OrderReducer } from "./order/slice";
import { authReducer } from "./auth/slice";

const persistAuth = {
  key: "userDetails",
  whitelist: ["token", "userContactDetails"],
  storage,
};

const persistOrder = {
  key: "orderItems",
  whitelist: ["orderItems"],
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistAuth, authReducer),
    order: persistReducer(persistOrder, OrderReducer),
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
