import type { FavoriteItem } from "@/features/favorites/model/favorite-item";

export const selectFavorites = (state: { favorites: { items: FavoriteItem[] } }) => state.favorites.items;
