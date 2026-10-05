import { getTranslations } from "next-intl/server";
import { formatModelName } from "@/lib/seo/format-model-name";

interface CategoryModelSeoInput {
  locale: string;
  categoryName: string;
  modelName: string;
  productCount: number;
}

/** Заголовок, H1 і опис під запит «деталь + модель» — одні й ті самі для метаданих і сторінки. */
export async function getCategoryModelSeo({ locale, categoryName, modelName, productCount }: CategoryModelSeoInput) {
  const t = await getTranslations({ locale, namespace: "seo" });
  const values = { category: categoryName.replace(/\s+/g, " ").trim(), model: formatModelName(modelName) };

  return {
    model: values.model,
    title: t("categoryModelTitle", values),
    h1: t("categoryModelH1", values),
    description: t("categoryModelDescription", { ...values, count: productCount }),
  };
}
