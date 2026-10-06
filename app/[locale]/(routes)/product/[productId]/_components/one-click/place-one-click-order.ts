export interface OneClickItem {
  productId: string;
  title: string;
  price: string;
  article: string;
  quantity: 1;
}

type CreateOrder = (data: unknown) => Promise<{ orderNumber: number } | null>;

/** Замовлення в один клік: лише телефон; доставку й оплату менеджер узгодить у дзвінку. */
export async function placeOneClickOrder(phone: string, item: OneClickItem, create: CreateOrder) {
  const order = await create({
    phone,
    postService: "novaPoshta",
    paymentMethod: "cashOnDelivary",
    products: [item],
  });
  if (!order) throw new Error("One-click order was not created");
  return order.orderNumber;
}
