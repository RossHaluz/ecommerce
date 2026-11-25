import { useTranslations } from "next-intl";
import type { Product } from "@/lib/types";
import { SimilarCard } from "../similar-products/similar-card";

/** Inside «Продано»: in-stock parts like this one, swiped on a phone, a grid on a computer. */
export const SoldAlternatives = ({ products }: { products: Product[] }) => {
  const t = useTranslations("product");
  if (!products.length) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="m-0 text-base font-extrabold text-[#2E2E2E]">{t("soldAlternatives")}</h2>
      <ul className="-mx-4 m-0 flex snap-x scroll-px-4 gap-2.5 overflow-x-auto px-4 pb-1 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-3 lg:overflow-visible lg:px-0 xl:grid-cols-3">
        {products.map((product) => (
          <li key={product.id} className="w-[160px] shrink-0 snap-start lg:w-auto">
            <SimilarCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};
