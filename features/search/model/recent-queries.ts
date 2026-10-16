export const RECENT_LIMIT = 6;

/** Свіжий запит — першим, без повторів (без огляду на регістр), не більше `RECENT_LIMIT`. */
export const addRecentQuery = (recent: string[], query: string): string[] => {
  const key = query.toLowerCase();
  return [query, ...recent.filter((item) => item.toLowerCase() !== key)].slice(0, RECENT_LIMIT);
};

export const removeRecentQuery = (recent: string[], query: string): string[] => recent.filter((item) => item !== query);

/** Що б не лежало в localStorage — масив рядків або порожньо. */
export const parseRecentQueries = (stored: string | null): string[] => {
  try {
    const value: unknown = JSON.parse(stored ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string").slice(0, RECENT_LIMIT) : [];
  } catch {
    return [];
  }
};
