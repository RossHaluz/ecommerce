"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { useAddToCart } from "../hooks/use-add-to-cart";
import { CartSheet } from "./cart-sheet";

interface AddedToCartSheetProps {
  product: Product;
  /** Кнопка «Купити»: отримує buy(кількість) і малює себе як потрібно місцю. */
  renderTrigger: (buy: (quantity?: number) => void) => ReactNode;
}

/** Після «Купити» — той самий кошик із підтвердженням; відкривається, лише якщо товар справді додано. */
export const AddedToCartSheet = ({ product, renderTrigger }: AddedToCartSheetProps) => {
  const t = useTranslations("cart");
  const addToCart = useAddToCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      {renderTrigger((quantity) => setOpen(addToCart(product, quantity)))}
      <CartSheet
        open={open}
        onOpenChange={setOpen}
        heading={
          <span className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#008038]">
              <Check size={16} strokeWidth={3} className="text-white" aria-hidden />
            </span>
            {t("added")}
          </span>
        }
      />
    </>
  );
};
