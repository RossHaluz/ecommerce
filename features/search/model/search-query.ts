const MIN_LENGTH = 2;
// Довший рядок — не запит покупця, а вставлений абзац; бекенду він ні до чого.
const MAX_LENGTH = 100;

/** Запит, з яким варто йти на бекенд, або `null`. */
export const searchQueryOf = (raw: unknown): string | null => {
  if (typeof raw !== "string") return null;
  const query = raw.trim().replace(/\s+/g, " ");
  return query.length >= MIN_LENGTH && query.length <= MAX_LENGTH ? query : null;
};
