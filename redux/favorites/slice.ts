import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { FavoriteItem } from "@/features/favorites/model/favorite-item";

export interface FavoritesState {
  items: FavoriteItem[];
}

const initialState: FavoritesState = { items: [] };

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    /** Нове — нагору: щойно відмічене людина шукає першим. */
    toggleFavorite(state, action: PayloadAction<FavoriteItem>) {
      const exists = state.items.some((item) => item.id === action.payload.id);
      state.items = exists ? state.items.filter((item) => item.id !== action.payload.id) : [action.payload, ...state.items];
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearFavorites(state) {
      state.items = [];
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
