import { formatModelName } from "@/lib/seo/format-model-name";
import type { Product } from "@/lib/types";

/** На сторінці моделі — її назва, якщо товар до неї підходить; інакше нічого не обіцяємо. */
export const fittingModel = (models: Product["models"] | undefined, modelSlug: string | undefined): string | undefined => {
  if (!modelSlug) return undefined;
  const name = models?.find((item) => item.model?.modelName === modelSlug)?.model?.name;
  return name ? formatModelName(name) : undefined;
};
