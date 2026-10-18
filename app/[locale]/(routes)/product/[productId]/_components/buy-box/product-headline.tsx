import { useTranslations } from "next-intl";
import type { Product } from "@/lib/types";
import { CatalogNumberChip } from "./catalog-number-chip";

/** H1 і номери деталі — однакові для товару в продажу й проданого. */
export const ProductHeadline = ({ product, heading }: { product: Product; heading: string }) => {
  const t = useTranslations("product");

  return (
    <>
      <h1 className="m-0 text-[22px] leading-7 lg:text-[30px] lg:leading-9 font-extrabold text-[#2E2E2E]">{heading}</h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {product.catalog_number && <CatalogNumberChip value={product.catalog_number} />}
        {product.article && (
          <span className="text-[#6B6B6B]">
            {t("article")} {product.article}
          </span>
        )}
      </div>
    </>
  );
};
