import type { OneClickItem } from "@/features/one-click/place-one-click-order";
import { unitPrice } from "@/entities/order-item/model/unit-price";
import type { OrderItem } from "@/redux/order/slice";

/** Кошик → «1 клік»: ціна за штуку (сума рядка тут подвоювала б аналітику). */
export const toOneClickItems = (items: OrderItem[]): OneClickItem[] =>
  items.map((item) => ({
    productId: item.id,
    title: item.title,
    article: item.article,
    price: unitPrice(item),
    quantity: item.quantity,
  }));
