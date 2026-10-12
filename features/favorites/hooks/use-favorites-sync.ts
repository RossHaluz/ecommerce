"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncAccountFavorites } from "@/actions/favorites";
import { useCurrentUser } from "@/features/account";
import { selectFavorites, selectFavoritesAccountId, selectFavoritesRehydrated } from "@/redux/favorites/selectors";
import { setAccountFavorites } from "@/redux/favorites/slice";
import { guestIdsToMerge } from "../model/guest-ids-to-merge";

/** Раз на завантаження для авторизованого: браузер отримує той самий список, що й інші його пристрої. */
export const useFavoritesSync = () => {
  const dispatch = useDispatch();
  const { data: user } = useCurrentUser();
  const items = useSelector(selectFavorites);
  const accountId = useSelector(selectFavoritesAccountId);
  const rehydrated = useSelector(selectFavoritesRehydrated);
  const syncedFor = useRef<string | null>(null);
  // Свіжий стан без перезапуску ефекту на кожне ♡ — синхронізація лише при зміні користувача.
  const latest = useRef({ items, accountId });
  latest.current = { items, accountId };

  useEffect(() => {
    if (!user?.id || !rehydrated || syncedFor.current === user.id) return;
    syncedFor.current = user.id;
    const userId = user.id;
    syncAccountFavorites(guestIdsToMerge(latest.current)).then((list) => {
      if (list) dispatch(setAccountFavorites({ accountId: userId, items: list }));
    });
  }, [user?.id, rehydrated, dispatch]);
};
