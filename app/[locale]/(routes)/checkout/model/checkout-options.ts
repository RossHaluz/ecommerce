/** Варіанти доставки на екрані. Бекенд знає лише postService — переклад у build-order-payload. */
export const DELIVERY_METHODS = ["warehouse", "courier", "pickup", "transporter"] as const;
export type DeliveryMethod = (typeof DELIVERY_METHODS)[number];

/** «transporter» — лише для дропшиперів, як і раніше. */
export const deliveryMethodsFor = (isDrop: boolean): readonly DeliveryMethod[] =>
  isDrop ? DELIVERY_METHODS : DELIVERY_METHODS.filter((method) => method !== "transporter");

// Написання «Delivary» — з бази й адмінки; виправлення = міграція даних, не правка тут.
export const PAYMENT_METHODS = ["cashOnDelivary", "payByCard"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
