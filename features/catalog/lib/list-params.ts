/** Що з адреси визначає вміст списку товарів. */
export interface ListParams {
  page: number;
  sortByPrice?: string;
  stockStatus?: string;
  searchValue?: string;
}

/** Те, що сервер рендерить для кешованих сторінок: перша сторінка без фільтрів. */
export const DEFAULT_LIST_PARAMS: ListParams = { page: 1 };

const FILTER_KEYS = ["sortByPrice", "stockStatus", "searchValue"] as const;

export function parseListParams(query: { get(key: string): string | null }): ListParams {
  const page = Number(query.get("page"));
  const params: ListParams = { page: Number.isInteger(page) && page > 0 ? page : 1 };

  for (const key of FILTER_KEYS) {
    const value = query.get(key);
    if (value) params[key] = value;
  }
  return params;
}

export const sameListParams = (a: ListParams, b: ListParams) =>
  a.page === b.page && FILTER_KEYS.every((key) => a[key] === b[key]);
