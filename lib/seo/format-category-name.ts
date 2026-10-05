/** Назви категорій в базі бувають з подвійними пробілами й переносами — в заголовок і посилання йде чиста. */
export const formatCategoryName = (raw: string) => raw.replace(/\s+/g, " ").trim();
