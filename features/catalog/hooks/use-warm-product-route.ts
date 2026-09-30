"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { productHref } from "@/entities/product/model/product-href";

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
    const warm = () => router.prefetch(productHref(productName, pathname));

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warm);
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(warm, 1500);
    return () => clearTimeout(id);
  }, [productName, pathname, router]);
};
