import type { FavoriteItem } from "./favorite-item";

/**
 * У кабінет дописуємо лише справжній гостьовий список. Якщо браузер уже віддзеркалює кабінет — цей чи
 * чужий (сесія сплила без виходу), — головний кабінет: інакше прибране на телефоні поверталося б,
 * а чужий список потрапляв би в новий акаунт.
 */
export const guestIdsToMerge = (local: { items: FavoriteItem[]; accountId: string | null }): string[] =>
  local.accountId === null ? local.items.map((item) => item.id) : [];
