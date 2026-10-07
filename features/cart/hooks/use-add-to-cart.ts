"use client";

import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { trackEvent } from "@/lib/analytics/gtag";
import { cartEvent } from "@/lib/analytics/ecommerce-events";
import { addItemToCart } from "@/redux/order/slice";
import { selectOrderItems } from "@/redux/order/selector";
import { remainingToAdd } from "@/entities/order-item/model/max-orderable";
import type { Product } from "@/lib/types";

/**
 * «Додати в кошик» — бізнес-дія, а не пряме звернення до Redux. Понад залишок не додає й каже
 * чому — раніше повторне «Купити» мовчки робило 2 шт. останньої деталі.
 * Повертає, чи товар справді додано (кнопка відкриває «Додано в кошик» лише тоді).
 */
export const useAddToCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectOrderItems);
  const t = useTranslations("cart");

  return (product: Product, quantity = 1): boolean => {
    const inCart = items?.find((item) => item.id === product.id)?.quantity ?? 0;
    if (quantity > remainingToAdd(product.quantity, inCart)) {
      toast.error(t("noMoreStock", { count: product.quantity }));
      return false;
    }

    const unit = Number(product.price);
    dispatch(
      addItemToCart({
        ...product,
        stock: product.quantity,
        quantity,
        price: unit * quantity,
        priceForOne: unit,
        orderItemId: nanoid(),
      })
    );
    trackEvent("add_to_cart", cartEvent([{ ...product, quantity }]));
    return true;
  };
};
