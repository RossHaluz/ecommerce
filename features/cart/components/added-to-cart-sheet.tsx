"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Product } from "@/lib/types";
import { useAddToCart } from "../hooks/use-add-to-cart";
import { Link } from "@/i18n/routing";
import { selectOrderItems } from "@/redux/order/selector";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import CartPreview from "./cart-preview";
import { CartTotal } from "./cart-total-line";
import { useRemoveFromCart } from "../hooks/use-remove-from-cart";

interface AddedToCartSheetProps {
  product: Product;
  /** Кнопка «Купити»: отримує buy(кількість) і малює себе як потрібно місцю. */
  renderTrigger: (buy: (quantity?: number) => void) => ReactNode;
}

/**
 * Після «Купити»: підтвердження, що в кошику, сума й найкоротший шлях до оформлення.
 * Відкривається лише якщо товар справді додано — понад залишок з'являється пояснення, а не «Додано».
 * Шторка знизу на телефоні (під великим пальцем), справа на комп'ютері (сторінку видно).
 */
export const AddedToCartSheet = ({ product, renderTrigger }: AddedToCartSheetProps) => {
  const t = useTranslations("cart");
  const items = useHydratedSelector(selectOrderItems);
  const removeFromCart = useRemoveFromCart();
  const addToCart = useAddToCart();
  const isPhone = useIsSmallScreen(1023);
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {renderTrigger((quantity) => setOpen(addToCart(product, quantity)))}
      <SheetContent
        side={isPhone ? "bottom" : "right"}
        className="flex flex-col gap-4 bg-white text-[#484848] max-lg:max-h-[90vh] max-lg:rounded-t-2xl sm:max-w-[440px]"
      >
        <SheetHeader className="flex-row items-center gap-2.5 space-y-0 pr-8 text-left">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#008038]">
            <Check size={16} strokeWidth={3} className="text-white" aria-hidden />
          </span>
          <SheetTitle className="text-lg font-extrabold text-[#2E2E2E]">{t("added")}</SheetTitle>
          <SheetDescription className="sr-only">{t("checkout")}</SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <CartPreview items={items} onRemove={removeFromCart} />
        </div>

        <CartTotal items={items} />

        {items?.length ? (
          <Link
            href="/checkout"
            className="flex h-[52px] items-center justify-center rounded-lg bg-[#C0092A] text-[17px] font-extrabold text-white"
          >
            {t("placeOrder")}
          </Link>
        ) : null}
        <SheetClose className="h-11 text-[15px] font-bold text-[#484848] underline">{t("continueShopping")}</SheetClose>
      </SheetContent>
    </Sheet>
  );
};
