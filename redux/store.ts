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
import { customizerReducer } from "./customizer/slice";
import { scrollUpReducer } from "./scroll-up/slice";
import { favoritesReducer } from "./favorites/slice";
import { myCarReducer } from "./my-car/slice";

const persistCustomizer = {
  key: "currentCustomizer",
  whitelist: ["currentCustomizer", "currency"],
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
  whitelist: ["items", "accountId"],
  storage,
};

const persistMyCar = {
  key: "myCar",
  whitelist: ["car"],
  storage,
};

const persistedAuthReducer = persistReducer(persistAuth, authReducer);
const persistedFavoritesReducer = persistReducer(persistFavorites, favoritesReducer);
const persistedMyCarReducer = persistReducer(persistMyCar, myCarReducer);
const persistedOrderReducer = persistReducer(persistOrder, OrderReducer);
const persistCustomizerReducer = persistReducer(
  persistCustomizer,
  customizerReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    order: persistedOrderReducer,
    customizer: persistCustomizerReducer,
    scrollUp: scrollUpReducer,
    favorites: persistedFavoritesReducer,
    myCar: persistedMyCarReducer,
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
