export type CreateOrder = (payload: unknown) => Promise<{ orderNumber: number } | null>;

/** createOrder повертає null при збої бекенда — без цієї перевірки людина бачила «Дякуємо», а замовлення не існувало. */
export async function submitOrder(payload: unknown, create: CreateOrder): Promise<number> {
  const order = await create(payload);
  if (!order) throw new Error("Order was not created");
  return order.orderNumber;
}
