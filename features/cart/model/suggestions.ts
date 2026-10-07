import type { Product } from "@/lib/types";

interface CartLineLike {
  id: string;
  models?: { model?: { modelName?: string } }[];
}

/** Під чию машину підбирати: перша модель першого товару кошика, що її має. */
export const suggestionModel = (items: CartLineLike[] | undefined): string | null => {
  for (const item of items ?? []) {
    const modelName = item.models?.find((link) => link.model?.modelName)?.model?.modelName;
    if (modelName) return modelName;
  }
  return null;
};

/** Без того, що вже в кошику: «купіть ще раз те саме» — не порада. */
export const pickSuggestions = (products: Product[] | undefined, items: CartLineLike[] | undefined): Product[] => {
  const inCart = new Set((items ?? []).map((item) => item.id));
  return (products ?? []).filter((product) => !inCart.has(product.id));
};
