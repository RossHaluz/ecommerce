import { FC } from "react";
import { getTranslations } from "next-intl/server";
import type { Product } from "@/lib/types";
import { SimilarCard } from "./similar-card";

interface SimilarProductsProps {
  similarProducts: Product[];
  /** «Q8 (2018–2023)», коли товар під одну модель: «Ще для Audi …» конкретніше за «можуть зацікавити». */
  model?: string;
}

/** Комп'ютер: сітка 4 в ряд (перші 8). Телефон: стрічка карток 160px, гортається пальцем. Без Swiper — лише CSS. */
const SimilarProducts: FC<SimilarProductsProps> = async ({ similarProducts, model }) => {
  if (!similarProducts?.length) return null;
  const t = await getTranslations("product");

  return (
    <section className="-mx-4 flex flex-col gap-3.5 bg-[#FFFDFD] py-5 lg:mx-0 lg:bg-transparent lg:py-6">
      <h2 className="m-0 px-4 text-lg font-extrabold text-[#2E2E2E] lg:px-0 lg:text-[22px]">
        {model ? t("similarForModel", { model }) : t("similar")}
      </h2>
      <ul className="m-0 flex snap-x scroll-px-4 gap-2.5 overflow-x-auto px-4 pb-1 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-0 lg:[&>li:nth-child(n+9)]:hidden">
        {similarProducts.map((product) => (
          <li key={product.id} className="w-[160px] shrink-0 snap-start lg:w-auto">
            <SimilarCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SimilarProducts;
