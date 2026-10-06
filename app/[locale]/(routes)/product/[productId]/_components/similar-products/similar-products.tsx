import { FC } from "react";
import { getTranslations } from "next-intl/server";
import SimilarProductsSlider from "./similar-products-slider";
import type { Product } from "@/lib/types";

interface SimilarProductsProps {
  similarProducts: Product[];
  /** «Q8 (2018–2023)», коли товар під одну модель: «Ще для Audi …» конкретніше за «можуть зацікавити». */
  model?: string;
}

/**
 * Лишається серверним компонентом (не "use client") — переклад тут не
 * потребує жодного клієнтського стану, `getTranslations` працює асинхронно
 * на сервері. Менше JS у клієнтському бандлі.
 */
const SimilarProducts: FC<SimilarProductsProps> = async ({
  similarProducts,
  model,
}) => {
  const t = await getTranslations("product");

  return (
    <div className="flex flex-col gap-4 py-6">
      {similarProducts?.length > 0 && (
        <h2 className="text-xl font-bold">{model ? t("similarForModel", { model }) : t("similar")}</h2>
      )}
      <SimilarProductsSlider similarProducts={similarProducts} />
    </div>
  );
};

export default SimilarProducts;
