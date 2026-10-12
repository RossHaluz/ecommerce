"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { queryKeys } from "@/lib/query-keys";
import { resetFavorites } from "@/redux/favorites/slice";

/**
 * Єдине місце, де змінюється сесія: cookie, заголовок axios і кеш користувача
 * міняються разом. Інакше після входу кеш показував би гостя.
 */
export const useSession = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return {
    signIn: (token: string, { days = 7 }: { days?: number } = {}) => {
      Cookies.set("token", token, { expires: days });
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUser() });
    },
    signOut: () => {
      Cookies.remove("token");
      delete axios.defaults.headers.common.Authorization;
      queryClient.setQueryData(queryKeys.currentUser(), null);
      // Список лишається в кабінеті; на цьому пристрої після виходу його не видно іншим.
      dispatch(resetFavorites());
    },
  };
};
