"use client";

import { useTranslations } from "next-intl";
import CartIcon from "/public/images/cart.svg";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { selectOrderItems } from "@/redux/order/selector";
import { CartPreview, useRemoveFromCart } from "@/features/cart";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";

const HeaderCartMenu = () => {
  const orderItems = useHydratedSelector(selectOrderItems);
  const removeFromCart = useRemoveFromCart();
  const t = useTranslations();
  const count = orderItems?.length ?? 0;

  return (
    <Modal
      triggetBtn={
        <Button
          variant="ghost"
          className="p-0 relative"
          // Назва мусить містити видиме число, інакше Lighthouse: label-content-name-mismatch.
          aria-label={`${t("nav.cart")}: ${count}`}
        >
          <CartIcon className="stroke-[#FFFDFD]" />
          <div className="w-4 h-4 p-[5px] rounded-full bg-[#FFFDFD] absolute top-5 right-0 flex items-center justify-center">
            <span className="text-[#C0092A] text-xs">{count}</span>
          </div>
        </Button>
      }
      title={t("nav.cart")}
    >
      <CartPreview items={orderItems} onRemove={removeFromCart} />
    </Modal>
  );
};

export default HeaderCartMenu;
