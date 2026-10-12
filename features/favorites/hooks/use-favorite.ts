"use client";

import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { selectFavorites } from "@/redux/favorites/selectors";
import type { Product } from "@/lib/types";
import { toFavoriteItem } from "../model/favorite-item";
import { useFavoritesActions } from "./use-favorites-actions";

export const useFavorite = (product: Product) => {
  const { toggle } = useFavoritesActions();
  const isFavorite = useHydratedSelector(selectFavorites).some((item) => item.id === product.id);

  return { isFavorite, toggle: () => toggle(toFavoriteItem(product), isFavorite) };
};
