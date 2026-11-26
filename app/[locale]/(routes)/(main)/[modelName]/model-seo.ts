import { getTranslations } from "next-intl/server";
import { brandedModelName } from "@/lib/seo/model-brand";

/** Заголовок, H1 і опис під запит «запчастини + модель» — одні для метаданих і сторінки. */
export async function getModelSeo({ locale, modelName, productCount }: { locale: string; modelName: string; productCount: number }) {
  const t = await getTranslations({ locale, namespace: "seo" });
  const model = brandedModelName(modelName);

  return {
    model,
    title: t("modelTitle", { model }),
    h1: t("modelH1", { model }),
    description: t("modelDescription", { model, count: productCount }),
  };
}
