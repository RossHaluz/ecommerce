"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const GA_MEASUREMENT_ID = "G-5DKE9X66KP";

/**
 * gtag важить ~172 КБ (gzip): підключений одразу, він ділив канал і процесор з
 * першим фото на телефоні. Підключаємо після load, у простої (максимум за 3 с).
 * sendGAEvent до цього моменту губиться — події кошика/замовлення йдуть після
 * дій людини, тож на практиці це рідкість.
 */
export const DeferredGoogleAnalytics = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    const schedule = () => {
      idleId = window.requestIdleCallback
        ? window.requestIdleCallback(() => setReady(true), { timeout: 3000 })
        : window.setTimeout(() => setReady(true), 1000);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) (window.cancelIdleCallback ?? window.clearTimeout)(idleId);
    };
  }, []);

  return ready ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null;
};
