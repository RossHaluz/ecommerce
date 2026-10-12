"use client";

import { useFavoritesSync } from "../hooks/use-favorites-sync";

/** Нічого не малює: лише тримає обране в браузері й у кабінеті однаковим. */
export const FavoritesSync = () => {
  useFavoritesSync();
  return null;
};
