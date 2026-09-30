"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";

/**
 * Єдине місце, де змінюється сесія: cookie, заголовок axios і кеш користувача
 * міняються разом. Інакше після входу кеш показував би гостя.
 */
export const useSession = () => {
  const queryClient = useQueryClient();

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
    },
  };
};
