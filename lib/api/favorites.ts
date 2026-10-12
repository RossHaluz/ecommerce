import { ENDPOINTS } from "./endpoints";
import { request, STORE_ID } from "./http";
import type { FavoriteItem } from "@/features/favorites/model/favorite-item";

// Особисті дані: з токеном і без кешу — у кожного свій список.
const PERSONAL = { auth: true, revalidate: false } as const;

export const putAccountFavorite = (productId: string) =>
  request<unknown>(ENDPOINTS.favorite(STORE_ID, productId), { ...PERSONAL, method: "PUT" });

export const deleteAccountFavorite = (productId: string) =>
  request<unknown>(ENDPOINTS.favorite(STORE_ID, productId), { ...PERSONAL, method: "DELETE" });

export const mergeAccountFavorites = (productIds: string[]) =>
  request<{ favorites: FavoriteItem[] }>(ENDPOINTS.mergeFavorites(STORE_ID), {
    ...PERSONAL,
    method: "POST",
    body: { productIds },
  }).then((data) => data.favorites);
