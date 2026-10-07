"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "@/i18n/routing";
import { selectOrderItems } from "@/redux/order/selector";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import { CartTotal } from "./cart-total-line";
import { CartLine } from "./cart-line";
import { CartSuggestions } from "./cart-suggestions";

interface CartSheetProps {
  heading: ReactNode;
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** false — у самому оформленні: кнопка вела б на сторінку, де людина вже є. */
  withCheckoutLink?: boolean;
}

/**
 * Одна шторка кошика для шапки, нижнього меню й «Додано в кошик» — різниться лише заголовок.
 * Знизу на телефоні (під пальцем), справа на комп'ютері; сума й «Оформити» завжди внизу.
 */
export const CartSheet = ({ heading, trigger, open, onOpenChange, withCheckoutLink = true }: CartSheetProps) => {
  const t = useTranslations("cart");
  const items = useHydratedSelector(selectOrderItems) ?? [];
  const isPhone = useIsSmallScreen(1023);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        side={isPhone ? "bottom" : "right"}
        className="flex flex-col gap-0 bg-white p-0 text-[#484848] max-lg:max-h-[90vh] max-lg:rounded-t-2xl sm:max-w-[440px]"
      >
        <SheetHeader className="space-y-0 px-4 pb-2 pr-12 pt-4 text-left lg:px-6">
          <SheetTitle className="text-lg font-extrabold text-[#2E2E2E] lg:text-xl">{heading}</SheetTitle>
          <SheetDescription className="sr-only">{t("checkout")}</SheetDescription>
        </SheetHeader>

        {items.length ? (
          <>
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4 lg:px-6">
              <div>
                {items.map((item) => (
                  <CartLine key={item.orderItemId} item={item} variant="compact" />
                ))}
              </div>
              <CartSuggestions items={items} expandable={false} />
            </div>
            <div className="flex flex-col gap-2 border-t border-[#EEEEEE] px-4 pb-4 pt-3 lg:px-6">
              <CartTotal items={items} />
              {withCheckoutLink ? (
                <>
                  <Link href="/checkout" className="flex h-[52px] items-center justify-center rounded-lg bg-[#C0092A] text-[17px] font-extrabold text-white">
                    {t("placeOrder")}
                  </Link>
                  <SheetClose className="h-11 text-sm font-bold text-[#484848] underline">{t("continueShopping")}</SheetClose>
                </>
              ) : (
                <SheetClose className="h-[52px] rounded-lg bg-[#C0092A] text-[17px] font-extrabold text-white">{t("backToCheckout")}</SheetClose>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 px-4 py-12 text-center">
            <p className="m-0 text-base font-bold text-[#2E2E2E]">{t("empty")}</p>
            <SheetClose className="h-11 text-[15px] font-bold text-[#484848] underline">{t("continueShopping")}</SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
