"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useTranslations } from "next-intl";
import { selectOrderItems } from "@/redux/order/selector";
import { CartPreview, useAddToCart, useRemoveFromCart } from "@/features/cart";
import type { Product } from "@/lib/types";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";

interface ProductBtnProps {
  item: Product;
}

const ProductBtn = ({ item }: ProductBtnProps) => {
  const orderItems = useHydratedSelector(selectOrderItems);
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const t = useTranslations();

  return (
    <div className="w-full">
      <Modal
        triggetBtn={
          <Button
            className="w-full h-[52px] lg:h-14 rounded-lg text-[17px] lg:text-lg font-extrabold"
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
