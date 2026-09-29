import { CACHE_TAGS, ENDPOINTS } from "./endpoints";
import { request, orNull, STORE_ID, type RequestOptions } from "./http";
import type { Category } from "@/lib/types";

export interface CategoryListParams {
  limit?: string;
}

export interface CategoryProductsParams {
  categorySlug: string;
  page?: string | number;
  sortByPrice?: string;
  stockStatus?: string;
  pageSize?: string | number;
  modelSlug?: string;
}

const CATALOG_TTL = 300;

export function fetchCategories(params: CategoryListParams = {}) {
  return request<Category[]>(ENDPOINTS.categories(STORE_ID), {
    params: { limit: params.limit },
    revalidate: CATALOG_TTL,
    tags: [CACHE_TAGS.catalog],
  });
}

export const getCategories = (limit?: string) =>
  orNull("categories", fetchCategories({ limit }));

export function fetchCategoryProducts({
  categorySlug,
  page = 1,
  sortByPrice,
  stockStatus,
  pageSize = 50,
  modelSlug,
}: CategoryProductsParams) {
  const path = modelSlug
    ? ENDPOINTS.categoryByModel(STORE_ID, categorySlug, modelSlug)
    : ENDPOINTS.categoryDetails(STORE_ID, categorySlug);

  const options: RequestOptions = {
    params: { page, sortByPrice, stockStatus, pageSize },
    revalidate: CATALOG_TTL,
    tags: [CACHE_TAGS.catalog, CACHE_TAGS.category(categorySlug)],
  };

  return request<any>(path, options);
}

export const getCategoryProducts = (params: CategoryProductsParams) =>
  orNull("categoryProducts", fetchCategoryProducts(params));
