export type CreateOrder<T extends { orderNumber: number }> = (payload: unknown) => Promise<T | null>;

/** createOrder повертає null при збої бекенда — без цієї перевірки людина бачила «Дякуємо», а замовлення не існувало. */
export async function submitOrder<T extends { orderNumber: number }>(payload: unknown, create: CreateOrder<T>): Promise<T> {
  const order = await create(payload);
  if (!order) throw new Error("Order was not created");
  return order;
}
