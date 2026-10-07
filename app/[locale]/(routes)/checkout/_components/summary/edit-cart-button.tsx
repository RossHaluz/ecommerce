"use client";

import { useTranslations } from "next-intl";
import Modal from "@/components/ui/modal";
import { CartPreview, useRemoveFromCart } from "@/features/cart";
import type { OrderItem } from "@/redux/order/slice";

/** «Змінити» відкриває той самий кошик, що й у шапці, — без виходу з оформлення. */
export const EditCartButton = ({ items }: { items: OrderItem[] }) => {
  const t = useTranslations();
  const removeFromCart = useRemoveFromCart();

  return (
    <Modal
      triggetBtn={
        <button type="button" className="text-sm font-extrabold text-[#C0092A]">
          {t("checkout.editCart")}
        </button>
      }
      title={t("nav.cart")}
    >
      <CartPreview items={items} onRemove={removeFromCart} />
    </Modal>
  );
};
