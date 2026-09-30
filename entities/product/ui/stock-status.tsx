"use client";

import { useTranslations } from "next-intl";
import Available from "/public/images/available.svg";
import { cn } from "@/lib/utils";

interface StockStatusProps {
  quantity: number;
  className?: string;
  withIcon?: boolean;
}

/**
 * Єдине місце кольорів наявності. Попередні #00a046 / #ffa900 мали контраст
 * 3,4 і 1,9 на світлих картках (норма 4,5) — ці проходять на #FFFDFD і #F2F2F2.
 */
export const StockStatus = ({ quantity, className, withIcon = false }: StockStatusProps) => {
  const t = useTranslations("product");
  const inStock = quantity !== 0;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-[6px] font-medium",
        inStock ? "text-[#008038]" : "text-[#966400]",
        className
      )}
    >
      {withIcon && inStock && <Available className="stroke-current" aria-hidden />}
      {inStock ? t("inStock") : t("onOrder")}
    </span>
  );
};
