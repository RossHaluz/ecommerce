import type { Product } from "@/lib/types";

/**
 * Лише поля, потрібні картці списку, кошику й замовленню. API віддає повний
 * запис (опис, характеристики, ціни дропшиперів, мітки часу), і Next вбудовував
 * його в HTML для гідратації: 294 КБ на головній, що гальмувало LCP на телефоні.
 */
export const toProductCard = (product: Product): Product => ({
  id: product.id,
  title: product.title,
  price: product.price,
  quantity: product.quantity,
  article: product.article,
  product_name: product.product_name,
  catalog_number: product.catalog_number,
  images: (product.images ?? []).slice(0, 1).map(({ id, url }) => ({ id, url })),
  models: (product.models ?? []).map(({ model }) => ({
    model: { id: model.id, name: model.name, modelName: model.modelName },
  })),
});
