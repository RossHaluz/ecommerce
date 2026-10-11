"use client";

import { useTranslations } from "next-intl";
import CartIcon from "/public/images/cart.svg";
import { Button } from "@/components/ui/button";
import { selectOrderItems } from "@/redux/order/selector";
import { CartSheet } from "@/features/cart";
import { HeaderIconLabel } from "./header-icon-label";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";

/** compact — телефон: іконка з лічильником на місці колишнього телефону. */
const HeaderCartMenu = ({ compact = false }: { compact?: boolean }) => {
  const orderItems = useHydratedSelector(selectOrderItems);
  const t = useTranslations();
  const count = orderItems?.length ?? 0;

  return (
    <CartSheet
      heading={t("cart.title", { count })}
      trigger={
        <Button
          variant="ghost"
          className="h-auto p-0 hover:bg-transparent"
          // Назва починається з видимого «Кошик» і містить число (Lighthouse: label-content-name-mismatch).
          aria-label={`${t("nav.cart")}: ${count}`}
        >
          <HeaderIconLabel icon={<CartIcon className="stroke-white" aria-hidden />} label={t("nav.cart")} badge={count} compact={compact} />
        </Button>
      }
    />
  );
};

export default HeaderCartMenu;
