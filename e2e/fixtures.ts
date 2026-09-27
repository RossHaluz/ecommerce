import { test as base, expect } from "@playwright/test";

const API = process.env.E2E_API_URL ?? "http://localhost:3005";
const STORE_ID = process.env.STORE_ID ?? "25a4ead9-5f7d-4d12-9a93-15ff69478aaa";

export interface Catalog {
  categorySlug: string;
  categoryName: string;
  productSlug: string;
  productTitle: string;
  modelSlug: string;
}

/**
 * Слаги тягнемо з API, а не хардкодимо: база — копія прода, і конкретний товар
 * може зникнути. Тест має падати від зміни поведінки, а не від переїзду даних.
 */
async function loadCatalog(): Promise<Catalog> {
  const [categories, products, models] = await Promise.all([
    fetch(`${API}/api/category/${STORE_ID}`).then((r) => r.json()),
    fetch(`${API}/api/product/${STORE_ID}`).then((r) => r.json()),
    fetch(`${API}/api/model/${STORE_ID}`).then((r) => r.json()),
  ]);

  const category = categories?.data?.[0];
  const product = products?.data?.products?.find((p: any) => p?.product_name);
  const model = (models?.data ?? models)?.[0];

  if (!category || !product) {
    throw new Error(
      "Не вдалось отримати категорію/товар з API. Бекенд на :3005 запущено?"
    );
  }

  return {
    categorySlug: category.category_name,
    categoryName: category.name,
    productSlug: product.product_name,
    productTitle: product.title,
    modelSlug: model?.modelName ?? "",
  };
}

let cached: Catalog | null = null;

export const test = base.extend<{ catalog: Catalog }>({
  catalog: async ({}, use) => {
    cached ??= await loadCatalog();
    await use(cached);
  },
});

export { expect };
