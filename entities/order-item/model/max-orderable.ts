/**
 * Скільки штук можна взяти: у наявності — не більше залишку; 0 = «під замовлення», ліміту немає.
 * Те саме правило на бекенді (controllers/orders/price-order-lines.js) — він і є остаточна перевірка.
 * Невідомий залишок (кошик, збережений до цього поля) не обмежуємо на клієнті.
 */
export const maxOrderable = (stock: number | undefined): number =>
  stock !== undefined && stock > 0 ? stock : Infinity;

export const clampQuantity = (quantity: number, stock: number | undefined) =>
  Math.min(Math.max(1, Math.floor(quantity)), maxOrderable(stock));

/** Скільки ще можна докласти до того, що вже в кошику. */
export const remainingToAdd = (stock: number | undefined, inCart: number) => Math.max(0, maxOrderable(stock) - inCart);
