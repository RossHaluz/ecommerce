import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { FavoriteItem } from "@/features/favorites/model/favorite-item";

export interface FavoritesState {
  items: FavoriteItem[];
  /** Чий кабінет цей список віддзеркалює; `null` — гостьовий, ще не злитий. */
  accountId: string | null;
}

const initialState: FavoritesState = { items: [], accountId: null };

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
    /** Список із кабінету — головний, браузер лише його копія. */
    setAccountFavorites(state, action: PayloadAction<{ accountId: string; items: FavoriteItem[] }>) {
      state.items = action.payload.items;
      state.accountId = action.payload.accountId;
    },
    /** Вихід: на цьому пристрої знову гість із порожнім списком. */
    resetFavorites() {
      return initialState;
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites, setAccountFavorites, resetFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
