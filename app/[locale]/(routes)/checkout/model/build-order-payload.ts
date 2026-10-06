import type { CheckoutValues } from "./checkout-schema";
import type { DeliveryMethod } from "./checkout-options";

export interface CartLine {
  id: string;
  quantity: number;
  price: number | string;
  title: string;
  article: string;
}

const POST_SERVICE: Record<DeliveryMethod, "novaPoshta" | "pickup" | "transporter"> = {
  warehouse: "novaPoshta",
  courier: "novaPoshta",
  pickup: "pickup",
  transporter: "transporter",
};

/** Поля адреси, що мають сенс для способу доставки; решту шлемо порожніми — бекенд виводить тип доставки з того, що заповнено. */
const addressFor = ({ deliveryMethod, city, ref_city, separation, ref_separation, address }: CheckoutValues) => {
  const none = { city: "", ref_city: "", separation: "", ref_separation: "", address: "" };
  if (deliveryMethod === "pickup") return none;
  if (deliveryMethod === "courier") return { ...none, city, ref_city, address };
  return { ...none, city, ref_city, separation, ref_separation };
};

/** Тіло POST /order/:store/create — ті самі поля, що слала стара форма; контракт бекенду не змінюємо. */
export const buildOrderPayload = (values: CheckoutValues, items: CartLine[], isDrop: boolean) => ({
  postService: POST_SERVICE[values.deliveryMethod],
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
    price: Number(item.price),
    title: item.title,
    article: item.article,
  })),
});

export type OrderPayload = ReturnType<typeof buildOrderPayload>;
