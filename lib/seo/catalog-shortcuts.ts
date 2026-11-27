import type { LinkChip } from "@/components/seo/link-chips";
import type { Category, Model } from "@/lib/types";
import { brandedModelName } from "./model-brand";
import { formatCategoryName } from "./format-category-name";

/**
 * Моделі, де є що купити, від найбільшої — пряме посилання з головної каже Google, що ці сторінки важливі.
 * Список без лічильника (старий бекенд) не ріжемо: краще зайве посилання, ніж жодного.
 */
export const modelShortcuts = (models: Model[]): LinkChip[] =>
  models
    .filter((model) => model.modelName && (model._count?.products ?? 1) > 0)
    .sort((a, b) => (b._count?.products ?? 0) - (a._count?.products ?? 0))
    .map((model) => ({ href: `/${model.modelName}`, label: brandedModelName(model.name) }));

/** Підрозділи (Бампери, Крила, Фари…): у бічному меню їх видно лише всередині відкритого розділу. */
export const sectionShortcuts = (categories: Category[]): LinkChip[] =>
  categories.flatMap((category) =>
    (category.children ?? []).map((sub) => ({ href: `/categories/${sub.category_name}`, label: formatCategoryName(sub.name) })),
  );
