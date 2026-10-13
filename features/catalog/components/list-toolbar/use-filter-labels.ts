import { useTranslations } from "next-intl";
import type { Sort, Stock } from "../../lib/list-filters";

/** Одні підписи для вікна фільтрів і для чипсів — щоб вони не розійшлися. */
export const useFilterLabels = () => {
  const t = useTranslations("filters");
  const sort: Record<Sort, string> = { desc: t("sortDesc"), asc: t("sortAsc") };
  const stock: Record<Stock, string> = { all: t("allProducts"), in_stock: t("inStock"), pre_order: t("onOrder") };
  return { sort, stock };
};
