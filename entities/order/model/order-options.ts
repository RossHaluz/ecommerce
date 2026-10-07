/** Варіанти доставки на екрані. Бекенд знає лише postService (+ заповнена адреса чи відділення). */
export const DELIVERY_METHODS = ["warehouse", "courier", "pickup", "transporter"] as const;
export type DeliveryMethod = (typeof DELIVERY_METHODS)[number];

export type PostService = "novaPoshta" | "pickup" | "transporter";

/** «transporter» — лише для дропшиперів, як і раніше. */
export const deliveryMethodsFor = (isDrop: boolean): readonly DeliveryMethod[] =>
  isDrop ? DELIVERY_METHODS : DELIVERY_METHODS.filter((method) => method !== "transporter");

const POST_SERVICE: Record<DeliveryMethod, PostService> = {
  warehouse: "novaPoshta",
  courier: "novaPoshta",
  pickup: "pickup",
  transporter: "transporter",
};

export const toPostService = (method: DeliveryMethod): PostService => POST_SERVICE[method];

/** Зворотно для збереженого замовлення: кур'єр і відділення в бекенді — обидва novaPoshta, різниться лише адреса. */
export const deliveryMethodOf = ({ postService, address }: { postService?: string; address?: string }): DeliveryMethod => {
  if (postService === "pickup" || postService === "transporter") return postService;
  return address?.trim() ? "courier" : "warehouse";
};

// Написання «Delivary» — з бази й адмінки; виправлення = міграція даних, не правка тут.
export const PAYMENT_METHODS = ["cashOnDelivary", "payByCard"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const isPaymentMethod = (value: unknown): value is PaymentMethod => PAYMENT_METHODS.includes(value as PaymentMethod);
