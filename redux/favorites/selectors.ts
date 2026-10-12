import type { FavoriteItem } from "@/features/favorites/model/favorite-item";

interface FavoritesSlice {
  favorites: { items: FavoriteItem[]; accountId: string | null; _persist?: { rehydrated: boolean } };
}

export const selectFavorites = (state: FavoritesSlice) => state.favorites.items;

export const selectFavoritesAccountId = (state: FavoritesSlice) => state.favorites.accountId;

/** Без PersistGate список під'їжджає з localStorage асинхронно — синхронізувати лише після цього. */
export const selectFavoritesRehydrated = (state: FavoritesSlice) => Boolean(state.favorites._persist?.rehydrated);
