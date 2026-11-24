export interface CategoryNode {
  id: string;
  name: string;
  children?: CategoryNode[];
}

/** Category id → its names from the root down, e.g. body-lights → ["Кузов", "Фари"]. */
export type CategoryPaths = ReadonlyMap<string, string[]>;

export function categoryPaths(tree: CategoryNode[], parent: string[] = []): CategoryPaths {
  const paths = new Map<string, string[]>();
  for (const category of tree) {
    const path = [...parent, category.name];
    paths.set(category.id, path);
    categoryPaths(category.children ?? [], path).forEach((childPath, id) => paths.set(id, childPath));
  }
  return paths;
}

/** Google's product_type: the product's most specific site category, «Кузов > Фари». */
export function merchantProductType(categoryIds: string[], paths: CategoryPaths): string | undefined {
  const deepest = categoryIds
    .map((id) => paths.get(id))
    .filter((path): path is string[] => path !== undefined)
    .reduce<string[] | undefined>((best, path) => (!best || path.length > best.length ? path : best), undefined);
  return deepest?.join(" > ");
}
