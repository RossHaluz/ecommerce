"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/gtag";
import { isPhoneClick } from "@/lib/analytics/phone-click";

/** Один слухач на всю сторінку: посилання на телефон є й у серверних компонентах, де onClick не повісиш. */
export const TrackPhoneClicks = () => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (isPhoneClick(event.target)) trackEvent("contact_phone", {});
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
};
