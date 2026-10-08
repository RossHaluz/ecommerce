import { submitOrder, type CreateOrder } from "@/entities/order/model/submit-order";

export interface OneClickItem {
  productId: string;
  title: string;
  /** Лише для аналітики: бекенд бере ціну з бази. */
  price: number | string;
  article: string;
  quantity: number;
}

/** Замовлення в один клік (товар або весь кошик): лише телефон; доставку й оплату менеджер узгодить у дзвінку. */
export async function placeOneClickOrder(phone: string, items: OneClickItem[], create: CreateOrder<{ orderNumber: number }>) {
  const order = await submitOrder(
    {
      phone,
      postService: "novaPoshta",
      paymentMethod: "cashOnDelivary",
      products: items,
    },
    create
  );
  return order.orderNumber;
}
