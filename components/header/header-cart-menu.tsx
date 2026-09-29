"use client";

import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import CartIcon from "/public/images/cart.svg";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { selectOrderItems } from "@/redux/order/selector";
import { CartPreview, useRemoveFromCart } from "@/features/cart";

const HeaderCartMenu = () => {
  const orderItems = useSelector(selectOrderItems);
  const removeFromCart = useRemoveFromCart();
  const t = useTranslations();

  return (
    <Modal
      triggetBtn={
        <Button
          variant="ghost"
          className="p-0 relative"
          aria-label={t("nav.cart")}
        >
          <CartIcon className="stroke-[#FFFDFD]" />
          <div className="w-4 h-4 p-[5px] rounded-full bg-[#FFFDFD] absolute top-5 right-0 flex items-center justify-center">
            <span className="text-[#C0092A] text-xs">
              {orderItems?.length > 0 ? orderItems.length : 0}
            </span>
          </div>
        </Button>
      }
      title={t("nav.cart")}
      dialogCancel={t("cart.continueShopping")}
    >
      <CartPreview items={orderItems} onRemove={removeFromCart} />
    </Modal>
  );
};

export default HeaderCartMenu;
