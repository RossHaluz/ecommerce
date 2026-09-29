"use client";
import { FC } from "react";
import { useTranslations } from "next-intl";
import { usePriceFormatter } from "@/hooks/use-price-formatter";

interface ProductPriceProps {
  price: number;
}

const ProductPrice: FC<ProductPriceProps> = ({ price }) => {
  const { format } = usePriceFormatter();
  const t = useTranslations("product");

  return (
    <span className="text-[#c0092a] text-lg font-bold">
      {Number(price) === 0 ? t("negotiablePrice") : format(price)}
    </span>
  );
};

export default ProductPrice;
