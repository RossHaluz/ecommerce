/** Сума кошика в USD. `price` рядка — вже ціна × кількість (так його веде redux/order). */
export const cartTotal = (items: { price: number | string }[] | undefined) =>
  (items ?? []).reduce((sum, item) => sum + (Number(item.price) || 0), 0);

/** Скільки штук разом: «Товари (4 шт.)», коли однієї деталі взяли дві. */
export const cartPieces = (items: { quantity: number }[] | undefined) =>
  (items ?? []).reduce((sum, item) => sum + item.quantity, 0);
