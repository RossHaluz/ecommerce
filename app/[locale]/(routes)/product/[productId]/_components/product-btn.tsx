"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useTranslations } from "next-intl";
import { selectOrderItems } from "@/redux/order/selector";
import { CartPreview, useAddToCart, useRemoveFromCart } from "@/features/cart";
import type { Product } from "@/lib/types";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { cn } from "@/lib/utils";

interface ProductBtnProps {
  item: Product;
  className?: string;
}

const ProductBtn = ({ item, className }: ProductBtnProps) => {
  const orderItems = useHydratedSelector(selectOrderItems);
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const t = useTranslations();

  return (
    <div className="w-full">
      <Modal
        triggetBtn={
          <Button
            className={cn("w-full h-[52px] lg:h-14 rounded-lg text-[17px] lg:text-lg font-extrabold", className)}
            onClick={() => addToCart(item)}
          >
            {t("product.buy")}
          </Button>
        }
        title={t("cart.added")}
      >
        <CartPreview items={orderItems} onRemove={removeFromCart} />
      </Modal>
    </div>
  );
};

export default ProductBtn;
