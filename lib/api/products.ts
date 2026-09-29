import { CACHE_TAGS, ENDPOINTS } from "./endpoints";
import { request, orNull, STORE_ID } from "./http";
import type { Meta, Product } from "@/lib/types";

export interface ProductsResponse {
  products: Product[];
  meta: Meta;
}

export interface ProductListParams {
  page?: string | number;
  sortByPrice?: string;
  stockStatus?: string;
  pageSize?: string | number;
  searchValue?: string;
  modelId?: string;
}

const CATALOG_TTL = 300;
const DEFAULT_PAGE_SIZE = 52;

export function fetchProducts(params: ProductListParams = {}) {
  return request<ProductsResponse>(ENDPOINTS.products(STORE_ID), {
    params: { ...params, pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE },
    revalidate: CATALOG_TTL,
    tags: [CACHE_TAGS.catalog],
  });
}

export const getProducts = (params: ProductListParams = {}) =>
  orNull("products", fetchProducts(params));

/**
 * Товари, сумісні з конкретною моделлю Audi.
 *
 * `pageSize` тут тепер справді враховується. Раніше функція приймала параметр
 * і молча хардкодила 52 — виклик з іншим значенням тихо не працював.
 */
export function fetchProductsByModel(
  modelSlug: string,
  params: ProductListParams = {}
) {
  return request<ProductsResponse>(
    ENDPOINTS.productsByModel(STORE_ID, modelSlug),
    {
      params: { ...params, pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE },
      revalidate: CATALOG_TTL,
      tags: [CACHE_TAGS.catalog, CACHE_TAGS.models],
    }
  );
}

export const getProductsByModel = (
  modelSlug: string,
  params: ProductListParams = {}
) => orNull("productsByModel", fetchProductsByModel(modelSlug, params));

/**
 * Кидає `ApiError`, а не повертає null.
 *
 * Сторінка товару мусить відрізняти «такого товару немає» від «бекенд лежить»:
 * перше — це `notFound()` і код 404, друге — сторінка помилки. Зараз обидва
 * випадки дають 200 з порожнім каркасом (крок 8.5).
 */
export function fetchProductDetails(productSlug: string) {
  return request<any>(ENDPOINTS.productDetails(STORE_ID, productSlug), {
    revalidate: CATALOG_TTL,
    tags: [CACHE_TAGS.product(productSlug)],
  });
}

export const getProductDetails = (productSlug: string) =>
  orNull("productDetails", fetchProductDetails(productSlug));

/** Допоміжний блок: порожній список кращий за зламану сторінку товару. */
export const getSimilarProducts = (productSlug: string) =>
  orNull(
    "similarProducts",
    request<any>(ENDPOINTS.similarProducts(STORE_ID, productSlug), {
      revalidate: CATALOG_TTL,
      tags: [CACHE_TAGS.product(productSlug)],
    })
  );
