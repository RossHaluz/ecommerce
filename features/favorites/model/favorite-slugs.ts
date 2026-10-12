// Список приходить із браузера, а slug лягає в шлях до API без екранування — пропускаємо лише чисті.
const SLUG = /^[A-Za-z0-9_-]{1,160}$/;
export const MAX_FAVORITES_LOOKUP = 60;

export const safeFavoriteSlugs = (input: unknown): string[] =>
  Array.isArray(input)
    ? Array.from(new Set(input.filter((slug): slug is string => typeof slug === "string" && SLUG.test(slug)))).slice(0, MAX_FAVORITES_LOOKUP)
    : [];
