"use client";
import { FC } from "react";
import { useTranslations } from "next-intl";

interface ProductAttentionProps {
  price: number;
}

const ProductAttention: FC<ProductAttentionProps> = ({ price }) => {
  const t = useTranslations("product");

  if (price !== 0) return null;

  return (
    <p className="text-[#C0092A] lg:inline-block hidden">
      {t("negotiablePriceNote")}
    </p>
  );
};

export default ProductAttention;
