"use client";

import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getCurrentUser } from "@/actions/get-data";
import { queryKeys } from "@/lib/query-keys";

export interface CurrentUser {
  role: string;
}

/**
 * Один кешований запит на шапку, мобільну панель і мобільне меню (раніше кожен
 * тягнув сам — 5 запитів на кожен перехід). Без токена не питаємо зовсім.
 */
export const useCurrentUser = () =>
  useQuery({
    queryKey: queryKeys.currentUser(),
    queryFn: async () => ((await getCurrentUser()) as CurrentUser | null) ?? null,
    enabled: typeof window !== "undefined" && Boolean(Cookies.get("token")),
  });
