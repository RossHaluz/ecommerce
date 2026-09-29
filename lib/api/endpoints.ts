export const ENDPOINTS = {
  categories: (storeId: string) => `/category/${storeId}`,
  categoryDetails: (storeId: string, categorySlug: string) =>
    `/category/${storeId}/${categorySlug}`,
  categoryByModel: (storeId: string, categorySlug: string, modelSlug: string) =>
    `/category/${storeId}/${categorySlug}/${modelSlug}`,

  products: (storeId: string) => `/product/${storeId}`,
  productDetails: (storeId: string, productSlug: string) =>
    `/product/${storeId}/${productSlug}`,
  similarProducts: (storeId: string, productSlug: string) =>
    `/product/${storeId}/${productSlug}/similar-products`,
  productsByModel: (storeId: string, modelSlug: string) =>
    `/product/${storeId}/model/${modelSlug}`,

  models: (storeId: string) => `/model/${storeId}`,
  modelDetails: (storeId: string, modelSlug: string) =>
    `/model/${storeId}/${modelSlug}`,

  createOrder: (storeId: string) => `/order/${storeId}/create`,

  search: () => `/search`,
  searchPopular: () => `/search/popular`,
  searchSuggestions: () => `/search/suggestions`,

  currentUser: () => `/auth/current`,
  updateUser: () => `/auth/update`,
} as const;

export const CACHE_TAGS = {
  catalog: "catalog",
  category: (slug: string) => `category:${slug}`,
  product: (slug: string) => `product:${slug}`,
  models: "models",
} as const;
