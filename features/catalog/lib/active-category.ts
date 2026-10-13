import type { Category } from "@/lib/types";

export interface ActiveCategory {
  /** Категорія першого рівня, яку підсвічуємо й розгортаємо. */
  root?: Category;
  /** Підкатегорія, якщо відкрито саме її. */
  child?: Category;
}

/** На сторінці підкатегорії розгортаємо її батька — щоб було видно, де ти і що поруч. */
export const activeCategory = (categories: readonly Category[], slug: string | undefined): ActiveCategory => {
  if (!slug) return {};
  for (const root of categories) {
    if (root.category_name === slug) return { root };
    const child = root.children?.find((item) => item.category_name === slug);
    if (child) return { root, child };
  }
  return {};
};
