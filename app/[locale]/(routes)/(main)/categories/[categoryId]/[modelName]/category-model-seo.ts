import { getTranslations } from "next-intl/server";
import { formatCategoryName } from "@/lib/seo/format-category-name";
import { brandedModelName } from "@/lib/seo/model-brand";

interface CategoryModelSeoInput {
  locale: string;
  categoryName: string;
  modelName: string;
  productCount: number;
}

/** Заголовок, H1 і опис під запит «деталь + модель» — одні й ті самі для метаданих і сторінки. */
export async function getCategoryModelSeo({ locale, categoryName, modelName, productCount }: CategoryModelSeoInput) {
  const t = await getTranslations({ locale, namespace: "seo" });
  const values = { category: formatCategoryName(categoryName), model: brandedModelName(modelName) };
  const counted = { ...values, count: productCount };

  return {
    ...values,
    title: t("categoryModelTitle", counted),
    h1: t("categoryModelH1", values),
    description: t("categoryModelDescription", counted),
  };
}
