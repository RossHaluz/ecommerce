import { formatModelName } from "@/lib/seo/format-model-name";
import type { Model } from "@/lib/types";

/**
 * Модель у адресі списку означає, що бекенд уже відфільтрував товари під неї — кожна картка сумісна.
 * Назву беремо з довідника моделей: у відповіді категорії товари приходять без свого списку моделей.
 */
export const fittingModel = (catalogModels: readonly Model[], modelSlug: string | undefined): string | undefined => {
  if (!modelSlug) return undefined;
  const name = catalogModels.find((model) => model.modelName === modelSlug)?.name;
  return name ? formatModelName(name) : undefined;
};
