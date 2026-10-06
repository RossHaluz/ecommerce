import type { Crumb } from "@/lib/breadcrumbs/build-breadcrumb-trail";
import { formatCategoryName } from "@/lib/seo/format-category-name";
import { formatModelName } from "@/lib/seo/format-model-name";

interface CategoryRef {
  category?: { name: string; category_name: string; parentId?: string | null } | null;
}

interface ModelRef {
  model?: { name?: string; modelName?: string } | null;
}

export interface ProductBreadcrumbsSource {
  title: string;
  categories?: CategoryRef[];
  models?: ModelRef[];
}

type Category = NonNullable<CategoryRef["category"]>;

/** Категорії товару від загальної до вужчої: батьківська (без parentId) перед підкатегорією. */
export function orderedCategories(categories: CategoryRef[] = []): Category[] {
  const cats = categories.map((ref) => ref.category).filter((c): c is Category => Boolean(c));
  return [...cats.filter((c) => !c.parentId), ...cats.filter((c) => c.parentId)];
}

/**
 * Шлях з даних самого товару, а не з ?from=: Google приходить без параметра і
 * раніше бачив лише назву. Головну додає той, хто рендерить (іконка / JSON-LD).
 */
export function buildProductBreadcrumbs({ title, categories = [], models = [] }: ProductBreadcrumbsSource): Crumb[] {
  const ordered = orderedCategories(categories);
  const trail: Crumb[] = ordered.map((c) => ({ label: formatCategoryName(c.name), href: `/categories/${c.category_name}` }));

  const leaf = ordered.at(-1);
  const model = models.length === 1 ? models[0].model : null;
  if (leaf && model?.name && model.modelName) {
    trail.push({ label: `Audi ${formatModelName(model.name)}`, href: `/categories/${leaf.category_name}/${model.modelName}` });
  }

  return [...trail, { label: title, href: null }];
}
