"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { productHref } from "@/entities/product/model/product-href";

// Після load (він настає вже після першого фото), у простої. Раніше чекали ще 3 с, і
// на повільному телефоні людина встигала натиснути товар до прогріву — перехід ~2 с.
const WARM_IDLE_TIMEOUT_MS = 1000;

/**
 * Коли список простоює — один раз підтягнути код сторінки товару (він
 * спільний для всіх товарів). На телефоні між дотиком і кліком ~100 мс, код
 * за цей час не встигає, а дані — встигають.
 */
export const useWarmProductRoute = (productName: string | undefined) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!productName) return;
    let idleId: number | undefined;
    const warm = () => router.prefetch(productHref(productName, pathname));
    const schedule = () => {
      idleId = window.requestIdleCallback
        ? window.requestIdleCallback(warm, { timeout: WARM_IDLE_TIMEOUT_MS })
        : window.setTimeout(warm, WARM_IDLE_TIMEOUT_MS);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) (window.cancelIdleCallback ?? window.clearTimeout)(idleId);
    };
  }, [productName, pathname, router]);
};
