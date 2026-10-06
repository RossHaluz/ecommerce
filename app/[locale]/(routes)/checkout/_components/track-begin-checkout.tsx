"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics/gtag";
import { cartEvent } from "@/lib/analytics/ecommerce-events";
import { selectOrderItems } from "@/redux/order/selector";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";

/** Сходинка воронки «почав оформлення». Кошик з localStorage з'являється після гідратації — тому чекаємо товари. */
export const TrackBeginCheckout = () => {
  const items = useHydratedSelector(selectOrderItems);
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current || !items?.length) return;
    sent.current = true;
    trackEvent("begin_checkout", cartEvent(items));
  }, [items]);

  return null;
};
