"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { removeItemFromCart } from "@/redux/order/slice";

/**
 * "Прибрати з кошика" — та сама дублікація, що й `useAddToCart`: три копії
 * (`header.tsx`, `product-item.tsx`, `product-btn.tsx`), скрізь той самий
 * typo `hansleDeleteItem` і англійський hardcoded `toast.error`.
 */
export const useRemoveFromCart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("common");

  return (orderItemId: string) => {
    try {
      dispatch(removeItemFromCart(orderItemId));
      router.refresh();
    } catch (error) {
      toast.error(t("somethingWentWrong"));
    }
  };
};
