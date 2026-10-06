/** Сума кошика в USD. `price` рядка — вже ціна × кількість (так його веде redux/order). */
export const cartTotal = (items: { price: number | string }[] | undefined) =>
  (items ?? []).reduce((sum, item) => sum + (Number(item.price) || 0), 0);
