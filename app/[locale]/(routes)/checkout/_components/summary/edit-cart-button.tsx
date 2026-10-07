"use client";

import { useTranslations } from "next-intl";
import { CartSheet } from "@/features/cart";

/** «Змінити» відкриває той самий кошик, що й у шапці, — без виходу з оформлення. */
export const EditCartButton = () => {
  const t = useTranslations();

  return (
    <CartSheet
      heading={t("nav.cart")}
      withCheckoutLink={false}
      trigger={
        <button type="button" className="text-sm font-extrabold text-[#C0092A]">
          {t("checkout.editCart")}
        </button>
      }
    />
  );
};
