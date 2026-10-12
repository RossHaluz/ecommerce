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
import { customizerReducer } from "./customizer/slice";
import { scrollUpReducer } from "./scroll-up/slice";
import { favoritesReducer } from "./favorites/slice";

const persistCustomizer = {
  key: "currentCustomizer",
  whitelist: ["currentCustomizer", "currency"],
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

const persistFavorites = {
  key: "favorites",
  whitelist: ["items"],
  storage,
};

const persistedAuthReducer = persistReducer(persistAuth, authReducer);
const persistedFavoritesReducer = persistReducer(persistFavorites, favoritesReducer);
const persistedOrderReducer = persistReducer(persistOrder, OrderReducer);
const persisterSearchReducer = persistReducer(persistSearch, searchReducer);
const persistCustomizerReducer = persistReducer(
  persistCustomizer,
  customizerReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    order: persistedOrderReducer,
    search: persisterSearchReducer,
    customizer: persistCustomizerReducer,
    scrollUp: scrollUpReducer,
    favorites: persistedFavoritesReducer,
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

// Знімок до рехідрації — те саме, що бачить сервер (див. useHydratedSelector).
export const initialState = store.getState();

export const persistor = persistStore(store);
