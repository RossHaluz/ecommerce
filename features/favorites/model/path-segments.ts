// Список приходить із браузера, а значення лягає в шлях до API без екранування — пропускаємо лише чисті.
const SEGMENT = /^[A-Za-z0-9_-]{1,160}$/;
export const MAX_FAVORITES_LOOKUP = 60;

export const isSafePathSegment = (value: unknown): value is string => typeof value === "string" && SEGMENT.test(value);

/** Slug'и чи id товарів: без дублів, лише безпечні, не більше межі. */
export const safePathSegments = (input: unknown, limit = MAX_FAVORITES_LOOKUP): string[] =>
  Array.isArray(input) ? Array.from(new Set(input.filter(isSafePathSegment))).slice(0, limit) : [];
