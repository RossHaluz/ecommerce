"use client";

import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/routing";
import { createOrder } from "@/actions/get-data";
import { submitOrder } from "@/entities/order/model/submit-order";
import { trackEvent } from "@/lib/analytics/gtag";
import { purchaseEvent } from "@/lib/analytics/ecommerce-events";
import { cleareOrderItems, setOrderDetails, type OrderItem } from "@/redux/order/slice";
import { buildOrderPayload } from "../model/build-order-payload";
import type { CheckoutValues } from "../model/checkout-schema";

/** Відправка → аналітика → чистий кошик → «Дякуємо». Кошик чистимо лише після підтвердженого замовлення. */
export const usePlaceOrder = (items: OrderItem[], isDrop: boolean) => {
  const t = useTranslations("checkout");
  const dispatch = useDispatch();
  const router = useRouter();

  return async (values: CheckoutValues) => {
    try {
      const order = await submitOrder(buildOrderPayload(values, items, isDrop), createOrder);
      trackEvent("purchase", purchaseEvent(order.orderNumber, items, "checkout"));
      dispatch(setOrderDetails({ ...order, orderItems: items }));
      dispatch(cleareOrderItems());
      router.push("/success");
    } catch {
      toast.error(t("errors.orderFailed"));
    }
  };
};
