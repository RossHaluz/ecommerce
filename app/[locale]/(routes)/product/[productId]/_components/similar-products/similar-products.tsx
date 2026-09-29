import { FC } from "react";
import { getTranslations } from "next-intl/server";
import SimilarProductsSlider from "./similar-products-slider";
import type { Product } from "@/lib/types";

interface SimilarProductsProps {
  similarProducts: Product[];
}

/**
 * Лишається серверним компонентом (не "use client") — переклад тут не
 * потребує жодного клієнтського стану, `getTranslations` працює асинхронно
 * на сервері. Менше JS у клієнтському бандлі.
 */
const SimilarProducts: FC<SimilarProductsProps> = async ({
  similarProducts,
}) => {
  const t = await getTranslations("product");

  return (
    <div className="flex flex-col gap-4 py-6">
      {similarProducts?.length > 0 && (
        <h2 className="text-xl font-bold">{t("similar")}</h2>
      )}
      <SimilarProductsSlider similarProducts={similarProducts} />
    </div>
  );
};

export default SimilarProducts;
