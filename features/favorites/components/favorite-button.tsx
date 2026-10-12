"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/analytics/gtag";
import { cartEvent } from "@/lib/analytics/ecommerce-events";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { useFavorite } from "../hooks/use-favorite";

const VARIANTS = {
  overlay: "h-10 w-10 rounded-full bg-white/95 shadow-[0_1px_4px_rgba(0,0,0,0.15)]",
  outline: "h-[52px] w-[52px] rounded-lg border-2",
} as const;

interface FavoriteButtonProps {
  product: Product;
  variant?: keyof typeof VARIANTS;
  className?: string;
}

export const FavoriteButton = ({ product, variant = "overlay", className }: FavoriteButtonProps) => {
  const t = useTranslations("favorites");
  const { isFavorite, toggle } = useFavorite(product);

  const onClick = (event: React.MouseEvent) => {
    // Кнопка лежить поверх посилання на товар — клік не має відкривати картку.
    event.preventDefault();
    event.stopPropagation();
    if (!isFavorite) trackEvent("add_to_wishlist", cartEvent([product]));
    toggle();
  };

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={isFavorite ? t("remove") : t("add")}
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center justify-center transition-colors",
        VARIANTS[variant],
        isFavorite ? "border-[#C0092A] bg-[#FFF7F8] text-[#C0092A]" : "border-[#CFCFCF] text-[#484848] hover:text-[#C0092A]",
        variant === "overlay" && "bg-white/95",
        className
      )}
    >
      <Heart size={variant === "overlay" ? 20 : 22} fill={isFavorite ? "currentColor" : "none"} aria-hidden />
    </button>
  );
};
