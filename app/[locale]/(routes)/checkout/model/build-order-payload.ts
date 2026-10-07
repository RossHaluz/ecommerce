import type { CheckoutValues } from "./checkout-schema";
import { toPostService } from "@/entities/order/model/order-options";
import { unitPrice, type PricedLine } from "@/entities/order-item/model/unit-price";

export interface CartLine extends PricedLine {
  id: string;
  quantity: number;
  title: string;
  article: string;
}

/** Поля адреси, що мають сенс для способу доставки; решту шлемо порожніми — бекенд виводить тип доставки з того, що заповнено. */
const addressFor = ({ deliveryMethod, city, ref_city, separation, ref_separation, address }: CheckoutValues) => {
  const none = { city: "", ref_city: "", separation: "", ref_separation: "", address: "" };
  if (deliveryMethod === "pickup") return none;
  if (deliveryMethod === "courier") return { ...none, city, ref_city, address };
  return { ...none, city, ref_city, separation, ref_separation };
};

/** Тіло POST /order/:store/create — ті самі поля, що слала стара форма; контракт бекенду не змінюємо. */
export const buildOrderPayload = (values: CheckoutValues, items: CartLine[], isDrop: boolean) => ({
  postService: toPostService(values.deliveryMethod),
  paymentMethod: values.paymentMethod,
  firstName: values.firstName.trim(),
  lastName: values.lastName.trim(),
  phone: values.phone,
  email: values.email.trim(),
  comment: values.comment.trim(),
  ...addressFor(values),
  ...(isDrop && {
    clientFirstName: values.clientFirstName.trim(),
    clientLastName: values.clientLastName.trim(),
    clientPhone: values.clientPhone,
  }),
  products: items.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
    // Бекенд сам множить на quantity: сума рядка тут давала подвійну ціну за 2+ штуки.
    price: unitPrice(item),
    title: item.title,
    article: item.article,
  })),
});

export type OrderPayload = ReturnType<typeof buildOrderPayload>;
