import type { Category, Model } from "@/lib/types";

/**
 * Категорії й моделі для меню. Layout вбудовує їх у HTML кожної сторінки
 * (prefetchCatalog), тож мітки часу, storeId і лічильники — зайві байти, що
 * на телефоні конкурують з головним фото.
 */
export const toMenuCategory = (category: Category): Category => ({
  id: category.id,
  name: category.name,
  category_name: category.category_name,
  parentId: category.parentId ?? null,
  children: (category.children ?? []).map(toMenuCategory),
});

export const toMenuModel = (model: Model): Model => ({
  id: model.id,
  name: model.name,
  modelName: model.modelName,
});
