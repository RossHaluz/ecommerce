"use server";

import * as api from "@/lib/api";
import type { FavoriteItem } from "@/features/favorites/model/favorite-item";
import { isSafePathSegment, safePathSegments } from "@/features/favorites/model/path-segments";

// Бекенд приймає до 100 id при злитті гостьового списку.
const MAX_MERGE = 100;

/** Гостьовий список зливається з кабінетом; `null` — не вдалось (тоді лишаємо те, що в браузері). */
export const syncAccountFavorites = async (productIds: unknown): Promise<FavoriteItem[] | null> => {
  try {
    return await api.mergeAccountFavorites(safePathSegments(productIds, MAX_MERGE));
  } catch (error) {
    console.error("[favorites] sync:", error);
    return null;
  }
};

export const saveAccountFavorite = async (productId: unknown, isFavorite: boolean): Promise<boolean> => {
  if (!isSafePathSegment(productId)) return false;
  try {
    await (isFavorite ? api.putAccountFavorite(productId) : api.deleteAccountFavorite(productId));
    return true;
  } catch (error) {
    console.error("[favorites] save:", error);
    return false;
  }
};
