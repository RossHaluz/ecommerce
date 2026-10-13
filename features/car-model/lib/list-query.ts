const KEPT = ["sortByPrice", "stockStatus", "searchValue"] as const;

/** Сортування, наявність і пошук переживають зміну моделі; сторінка — ні, в іншої моделі їх інша кількість. */
export const keptListQuery = (search: string) => {
  const current = new URLSearchParams(search);
  const kept = new URLSearchParams();
  for (const key of KEPT) {
    const value = current.get(key);
    if (value) kept.set(key, value);
  }
  const query = kept.toString();
  return query ? `?${query}` : "";
};
