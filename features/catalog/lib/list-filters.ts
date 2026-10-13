export const SORTS = ["desc", "asc"] as const;
export const STOCKS = ["all", "in_stock", "pre_order"] as const;

export type Sort = (typeof SORTS)[number];
export type Stock = (typeof STOCKS)[number];

export interface ListFilters {
  sort: Sort;
  stock: Stock;
}

// Бекенд без параметра сортує від дорожчого — це й є «за замовчуванням».
export const DEFAULT_FILTERS: ListFilters = { sort: "desc", stock: "all" };

const pick = <T extends string>(allowed: readonly T[], value: string | null, fallback: T): T =>
  allowed.includes(value as T) ? (value as T) : fallback;

export const readFilters = (search: string): ListFilters => {
  const params = new URLSearchParams(search);
  return {
    sort: pick(SORTS, params.get("sortByPrice"), DEFAULT_FILTERS.sort),
    stock: pick(STOCKS, params.get("stockStatus"), DEFAULT_FILTERS.stock),
  };
};

/** Нові фільтри — нова видача з першої сторінки; пошуковий запит лишається. */
export const filtersQuery = (search: string, next: ListFilters) => {
  const query = new URLSearchParams();
  const searchValue = new URLSearchParams(search).get("searchValue");
  if (searchValue) query.set("searchValue", searchValue);
  if (next.sort !== DEFAULT_FILTERS.sort) query.set("sortByPrice", next.sort);
  if (next.stock !== DEFAULT_FILTERS.stock) query.set("stockStatus", next.stock);
  const text = query.toString();
  return text ? `?${text}` : "";
};

export const activeFilterCount = (filters: ListFilters) =>
  Number(filters.sort !== DEFAULT_FILTERS.sort) + Number(filters.stock !== DEFAULT_FILTERS.stock);
