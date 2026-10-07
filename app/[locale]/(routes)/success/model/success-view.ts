import { maskPhone } from "@/lib/format/mask-phone";
import { deliveryMethodOf, isPaymentMethod, type DeliveryMethod, type PaymentMethod } from "@/entities/order/model/order-options";
import type { OrderItem } from "@/redux/order/slice";

export interface StoredOrder {
  orderNumber: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  city?: string;
  separation?: string;
  address?: string;
  postService?: string;
  paymentMethod?: string;
  orderType?: string;
  dropshipDetails?: { clientFirstName?: string; clientLastName?: string; clientPhone?: string } | null;
  orderItems?: OrderItem[];
}

export type NextStep = "call" | "shipping" | "pickup" | "tracking";

// ТТН шле лише Нова пошта; самовивіз — без відправки взагалі.
const NEXT_STEPS: Record<DeliveryMethod, NextStep[]> = {
  warehouse: ["call", "shipping", "tracking"],
  courier: ["call", "shipping", "tracking"],
  transporter: ["call", "shipping"],
  pickup: ["call", "pickup"],
};

const fullName = (first?: string, last?: string) => [first, last].filter(Boolean).join(" ");

/** Що бачить людина на «Дякуємо»: для дропшипера отримувач — його клієнт, телефон — замаскований. */
export const toSuccessView = (order: StoredOrder) => {
  const drop = order.orderType === "DROPSHIP" ? order.dropshipDetails : null;
  const deliveryMethod = deliveryMethodOf(order);

  return {
    orderNumber: order.orderNumber,
    recipient: {
      name: drop ? fullName(drop.clientFirstName, drop.clientLastName) : fullName(order.firstName, order.lastName),
      phone: maskPhone((drop ? drop.clientPhone : order.phone) ?? ""),
    },
    deliveryMethod,
    deliveryPlace: [order.city, deliveryMethod === "courier" ? order.address : order.separation].filter(Boolean).join(", "),
    paymentMethod: isPaymentMethod(order.paymentMethod) ? (order.paymentMethod as PaymentMethod) : null,
    nextSteps: NEXT_STEPS[deliveryMethod],
    items: order.orderItems ?? [],
  };
};

export type SuccessView = ReturnType<typeof toSuccessView>;
