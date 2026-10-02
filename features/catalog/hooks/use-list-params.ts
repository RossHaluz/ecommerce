"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { parseListParams } from "../lib/list-params";

/**
 * Єдине місце, що читає параметри списку з адреси. Сторінки їх не читають:
 * інакше Next рендерить їх на кожен запит і забороняє кеш (no-store).
 * Потребує <Suspense> вище по дереву.
 */
export const useListParams = () => {
  const query = useSearchParams();
  return useMemo(() => parseListParams(query), [query]);
};
