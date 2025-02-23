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
import { searchReducer } from "./search/slice";
import { authReducer } from "./auth/slice";
import { categoryReducer } from "./categories/slice";
import { modelReducer } from "./models/slice";
import { customizerReducer } from "./customizer/slice";

const persistCustomizer = {
  key: "currentCustomizer",
  whitelist: ["currentCustomizer"],
  storage,
};

const persistModel = {
  key: "currentModel",
  whitelist: ["currentModel"],
  storage,
};

const persistSearch = {
  key: "searchDetails",
  whitelist: ["searchQuery", "searchItems"],
  storage,
};

const persistAuth = {
  key: "userDetails",
  whitelist: ["userContactDetails"],
  storage,
};

const persistOrder = {
  key: "orderItems",
  whitelist: ["orderItems", "orderDetails"],
  storage,
};

const persistedAuthReducer = persistReducer(persistAuth, authReducer);
const persistedOrderReducer = persistReducer(persistOrder, OrderReducer);
const persisterSearchReducer = persistReducer(persistSearch, searchReducer);
const persistModelReducer = persistReducer(persistModel, modelReducer);
const persistCustomizerReducer = persistReducer(
  persistCustomizer,
  customizerReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    order: persistedOrderReducer,
    search: persisterSearchReducer,
    category: categoryReducer,
    model: persistModelReducer,
    customizer: persistCustomizerReducer,
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
