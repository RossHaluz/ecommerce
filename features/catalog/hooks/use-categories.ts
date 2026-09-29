"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/actions/get-data";
import { queryKeys } from "@/lib/query-keys";

/**
 * Дерево категорій потрібне одразу п'ятьом компонентам (шапка, футер,
 * мобільне меню, хлібні крошки, головна секція) — раніше двоє з них незалежно
 * диспатчили той самий `getCategories()` у Redux. TanStack дедуплікує
 * однаковий ключ сам: п'ять викликів цього хука дають один мережевий запит.
 *
 * Без `initialData`, тому перший клієнтський кадр — порожній масив до
 * завершення фетчу. Це та сама поведінка, що була в Redux-версії; справжній
 * SSR-прогрів через `HydrationBoundary` — крок 3.2.3, ще не зроблений.
 */
export const useCategories = () =>
  useQuery({
    queryKey: queryKeys.categories(),
    queryFn: async () => {
      const categories = await getCategories();
      if (!categories) {
        throw new Error("Не вдалось завантажити категорії");
      }
      return categories;
    },
  });
