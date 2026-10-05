import { getTranslations } from "next-intl/server";
import { formatModelName } from "@/lib/seo/format-model-name";

/** Заголовок, H1 і опис під запит «запчастини + модель» — одні для метаданих і сторінки. */
export async function getModelSeo({ locale, modelName, productCount }: { locale: string; modelName: string; productCount: number }) {
  const t = await getTranslations({ locale, namespace: "seo" });
  const model = formatModelName(modelName);

  return {
    model,
    title: t("modelTitle", { model }),
    h1: t("modelH1", { model }),
    description: t("modelDescription", { model, count: productCount }),
  };
}
