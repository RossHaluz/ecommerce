"use client";
import Link from "next/link";
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
            className="w-full md:px-14 md:py-[10px] md:max-w-max"
            onClick={() => addToCart(item)}
          >
            {t("product.buy")}
          </Button>
        }
        title={t("cart.added")}
        dialogCancel={t("cart.continueShopping")}
        dialogAction={
          <Link
            href="/"
            className="flex items-center justify-center text-white text-base font-semibold y-[10px]"
          >
            {t("cart.placeOrder")}
          </Link>
        }
      >
        <CartPreview items={orderItems} onRemove={removeFromCart} />
      </Modal>
    </div>
  );
};

export default ProductBtn;
