"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { AskPriceSubject } from "../model/ask-price-text";
import { AskPriceSheet } from "./ask-price-sheet";

type Variant = "card" | "block" | "bar";

// card — вузька картка телефона (іконка 44 px, текст з md), block — головна кнопка картки товару, bar — липка панель.
const VARIANT_CLASS: Record<Variant, string> = {
  card: "h-11 min-w-[44px] px-0 md:px-4",
  block: "h-[52px] w-full text-[17px] lg:h-14 lg:text-lg",
  bar: "h-12 w-full text-base",
};

export const AskPriceButton = ({ product, variant, className }: { product: AskPriceSubject; variant: Variant; className?: string }) => {
  const t = useTranslations("askPrice");

  return (
    <AskPriceSheet
      product={product}
      renderTrigger={(open) => (
        <button
          type="button"
          onClick={open}
          aria-label={`${t("button")}: ${product.title}`}
          className={cn(
            "flex shrink-0 items-center justify-center gap-2 rounded-lg border-2 border-[#C0092A] bg-white font-extrabold text-[#C0092A] hover:bg-[#FFF2F4]",
            VARIANT_CLASS[variant],
            className,
          )}
        >
          <MessageCircle size={20} className={variant === "card" ? "md:hidden" : "hidden"} aria-hidden />
          <span className={variant === "card" ? "hidden md:inline" : undefined}>{t("button")}</span>
        </button>
      )}
    />
  );
};
