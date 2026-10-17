import { looksLikeOe } from "./exact-oe";

/**
 * Модель, якою звужуємо пошук, або `null`. OE-номер і так точно називає деталь: фільтр моделі лише ховав
 * її (фара Q8 за 4M8941035 не знаходилась, коли в «Моя Audi» стояла Q7).
 */
export const searchModelFilter = (query: string, onlyMyModel: boolean, myModelSlug: string | null): string | null =>
  onlyMyModel && myModelSlug && !looksLikeOe(query) ? myModelSlug : null;
