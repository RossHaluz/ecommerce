"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { productHref } from "@/entities/product/model/product-href";

/** Після повного завантаження: раніше код товару (swiper, framer-motion) ділив канал з першим фото. */
const WARM_DELAY_AFTER_LOAD_MS = 3000;

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
    let timer: ReturnType<typeof setTimeout> | undefined;
    const warm = () => router.prefetch(productHref(productName, pathname));
    const schedule = () => {
      timer = setTimeout(warm, WARM_DELAY_AFTER_LOAD_MS);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      clearTimeout(timer);
    };
  }, [productName, pathname, router]);
};
