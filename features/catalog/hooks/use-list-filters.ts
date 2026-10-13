"use client";

import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
import { DEFAULT_FILTERS, filtersQuery, readFilters, type ListFilters } from "../lib/list-filters";

/** Потребує <Suspense> вище: інакше useSearchParams зробив би сторінку списку некешованою. */
export const useListFilters = () => {
  const search = useSearchParams().toString();
  const router = useRouter();
  const pathname = usePathname();
  const filters = readFilters(search);

  const apply = (next: ListFilters) => router.push(`${pathname}${filtersQuery(search, next)}`, { scroll: false });

  return { filters, apply, reset: () => apply(DEFAULT_FILTERS) };
};
