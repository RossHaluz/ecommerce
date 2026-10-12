"use client";

import { useDispatch } from "react-redux";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { selectFavorites } from "@/redux/favorites/selectors";
import { toggleFavorite } from "@/redux/favorites/slice";
import type { Product } from "@/lib/types";
import { toFavoriteItem } from "../model/favorite-item";

export const useFavorite = (product: Product) => {
  const dispatch = useDispatch();
  const isFavorite = useHydratedSelector(selectFavorites).some((item) => item.id === product.id);

  return { isFavorite, toggle: () => dispatch(toggleFavorite(toFavoriteItem(product))) };
};
