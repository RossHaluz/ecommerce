"use client";

import { useEffect } from "react";
import { trackDeferredEvent } from "@/lib/analytics/gtag";
import { cartEvent, type AnalyticsItem } from "@/lib/analytics/ecommerce-events";

/** Перша сходинка воронки: товар побачили. Без розмітки — лише подія. */
export const TrackViewItem = ({ item }: { item: AnalyticsItem }) => {
  useEffect(() => {
    trackDeferredEvent("view_item", cartEvent([item]));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- одна подія на товар, не на кожен рендер
  }, [item.id]);

  return null;
};
