import { submitOrder, type CreateOrder } from "@/entities/order/model/submit-order";

export interface OneClickItem {
  productId: string;
  title: string;
  price: string;
  article: string;
  quantity: 1;
}

/** Замовлення в один клік: лише телефон; доставку й оплату менеджер узгодить у дзвінку. */
export async function placeOneClickOrder(phone: string, item: OneClickItem, create: CreateOrder<{ orderNumber: number }>) {
  const order = await submitOrder(
    {
      phone,
      postService: "novaPoshta",
      paymentMethod: "cashOnDelivary",
      products: [item],
    },
    create
  );
  return order.orderNumber;
}
