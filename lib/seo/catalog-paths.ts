/** Поля товару, з яких видно, де він показується в каталозі. */
export interface CatalogPlacement {
  categories?: { categoryId: string }[];
  models: { model?: { modelName?: string } | null }[];
}

interface CategoryNode {
  id: string;
  category_name: string;
  children?: CategoryNode[];
}

const modelSlugs = (product: CatalogPlacement) =>
  product.models
    .map((item) => item.model?.modelName)
    .filter((slug): slug is string => Boolean(slug));

const categorySlugById = (categories: CategoryNode[]) =>
  new Map(
    categories
      .flatMap((category) => [category, ...(category.children ?? [])])
      .map((category) => [category.id, category.category_name])
  );

/**
 * Пари «категорія + модель», де є хоча б один товар. Як і бекенд, рахуємо
 * лише пряму прив'язку товару до категорії: батьківська категорія не
 * успадковує товари підкатегорій.
 */
export function categoryModelPaths(
  products: CatalogPlacement[],
  categories: CategoryNode[]
): string[] {
  const slugById = categorySlugById(categories);
  const paths = new Set<string>();

  for (const product of products) {
    for (const { categoryId } of product.categories ?? []) {
      const categorySlug = slugById.get(categoryId);
      if (!categorySlug) continue;
      for (const modelSlug of modelSlugs(product)) {
        paths.add(`/categories/${categorySlug}/${modelSlug}`);
      }
    }
  }
  return Array.from(paths);
}

/** Сторінки моделей, у яких є хоча б один товар. */
export function modelPaths(products: CatalogPlacement[]): string[] {
  return Array.from(new Set(products.flatMap(modelSlugs).map((slug) => `/${slug}`)));
}
