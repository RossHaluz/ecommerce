"use client";

import { useQuery } from "@tanstack/react-query";
import { getModels } from "@/actions/get-data";
import { queryKeys } from "@/lib/query-keys";

export const useModels = () =>
  useQuery({
    queryKey: queryKeys.models(),
    queryFn: async () => {
      const models = await getModels();
      if (!models) {
        throw new Error("Не вдалось завантажити моделі");
      }
      return models;
    },
  });
