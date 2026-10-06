"use client";

import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { trackEvent } from "@/lib/analytics/gtag";
import { cartEvent } from "@/lib/analytics/ecommerce-events";
import { addItemToCart } from "@/redux/order/slice";
import type { Product } from "@/lib/types";

/**
 * "Додати в кошик" — бізнес-дія, а не пряме звернення до Redux. Картка
 * товару кличе цей хук, а не `dispatch(addItemToCart(...))` сама (правило 6
 * `ARCHITECTURE.md`): вона не повинна знати, що товар стає рядком кошика
 * через `nanoid` і GA-подію.
 *
 * Раніше три копії цієї функції (`product-item.tsx`, `product-btn.tsx`,
 * і `header.tsx` не мав власної, але `product-btn.tsx` мав додатково мертву
 * гілку кількості/опцій — `count`, `selectOptions`, `priceForOne`) множили
 * ціну на `count`, який ніколи не змінювався (стрілки кількості малював
 * `product-count.tsx`, що ніде не рендерився — видалено). Кількість завжди
 * `1`, тому одна проста сигнатура покриває обидва живі виклики.
 */
export const useAddToCart = () => {
  const dispatch = useDispatch();
  const t = useTranslations("common");

  return (product: Product) => {
    try {
      dispatch(
        addItemToCart({
          ...product,
          quantity: 1,
          price: Number(product.price),
          priceForOne: Number(product.price),
          orderItemId: nanoid(),
        })
      );

      trackEvent("add_to_cart", cartEvent([product]));
    } catch (error) {
      toast.error(t("somethingWentWrong"));
    }
  };
};
