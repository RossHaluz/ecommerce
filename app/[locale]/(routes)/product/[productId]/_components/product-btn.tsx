"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { AddedToCartSheet, useAddToCart } from "@/features/cart";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductBtnProps {
  item: Product;
  className?: string;
}

const ProductBtn = ({ item, className }: ProductBtnProps) => {
  const addToCart = useAddToCart();
  const t = useTranslations("product");

  return (
    <div className="w-full">
      <AddedToCartSheet
        trigger={
          <Button
            className={cn("w-full h-[52px] lg:h-14 rounded-lg text-[17px] lg:text-lg font-extrabold", className)}
            onClick={() => addToCart(item)}
          >
            {t("buy")}
          </Button>
        }
      />
    </div>
  );
};

export default ProductBtn;
