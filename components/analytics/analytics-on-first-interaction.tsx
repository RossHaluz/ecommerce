"use client";

import { useEffect } from "react";
import { loadAnalytics } from "@/lib/analytics/gtag";

const FIRST_INTERACTION_EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"] as const;

/**
 * GA4 вмикається на першу дію людини (рішення власника, 2026-10-05): Lighthouse
 * не діє, тож скрипт не потрапляє в заміри. capture — щоб спрацювати раніше за
 * обробник кнопки, яка сама відправляє подію (напр. «Купити» → add_to_cart).
 */
export const AnalyticsOnFirstInteraction = () => {
  useEffect(() => {
    const start = () => {
      FIRST_INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, start, true));
      loadAnalytics();
    };
    FIRST_INTERACTION_EVENTS.forEach((event) =>
      window.addEventListener(event, start, { capture: true, passive: true })
    );
    return () => FIRST_INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, start, true));
  }, []);

  return null;
};
