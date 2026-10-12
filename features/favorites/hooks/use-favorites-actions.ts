"use client";

import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { saveAccountFavorite } from "@/actions/favorites";
import { useCurrentUser } from "@/features/account";
import { clearFavorites, removeFavorite, toggleFavorite } from "@/redux/favorites/slice";
import type { FavoriteItem } from "../model/favorite-item";

/** Браузер змінюємо одразу (♡ без затримки), а кабінет — у фоні; збій кажемо, а не ховаємо. */
export const useFavoritesActions = () => {
  const dispatch = useDispatch();
  const { data: user } = useCurrentUser();
  const t = useTranslations("favorites");

  const saveToAccount = (ids: string[], isFavorite: boolean) => {
    if (!user) return;
    Promise.all(ids.map((id) => saveAccountFavorite(id, isFavorite))).then((results) => {
      if (results.includes(false)) toast.error(t("syncFailed"));
    });
  };

  return {
    toggle: (item: FavoriteItem, isFavorite: boolean) => {
      dispatch(toggleFavorite(item));
      saveToAccount([item.id], !isFavorite);
    },
    remove: (id: string) => {
      dispatch(removeFavorite(id));
      saveToAccount([id], false);
    },
    clear: (ids: string[]) => {
      dispatch(clearFavorites());
      saveToAccount(ids, false);
    },
  };
};
