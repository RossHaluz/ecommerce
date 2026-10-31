"use server";

import * as api from "@/lib/api";
import type { Product } from "@/lib/types";
import { toProductCard } from "@/entities/product/model/product-card";
import { safePathSegments } from "@/lib/validation/path-segments";

export const getCategories = (limit?: string) => api.getCategories(limit);

export const getCategoryDetails = (data: {
  categoryId: string;
  page?: string;
  sortByPrice?: string;
  stockStatus?: string;
  pageSize?: string;
}) =>
  api.getCategoryProducts({
    categorySlug: data.categoryId,
    page: data.page,
    sortByPrice: data.sortByPrice,
    stockStatus: data.stockStatus,
    pageSize: data.pageSize,
  });

export const getCategoryByModel = (data: {
  categoryId: string;
  modelName: string;
  page?: string;
  stockStatus?: string;
  sortByPrice?: string;
  pageSize?: string;
}) =>
  api.getCategoryProducts({
    categorySlug: data.categoryId,
    modelSlug: data.modelName,
    page: data.page,
    sortByPrice: data.sortByPrice,
    stockStatus: data.stockStatus,
    pageSize: data.pageSize ?? 52,
  });

// Партіями: 60 паралельних запитів уже раз вичерпували пул з'єднань Prisma на бекенді.
const FAVORITES_BATCH = 8;

const favoriteCard = async (slug: string): Promise<[string, Product | null] | null> => {
  try {
    const { product } = await api.fetchProductDetails(slug);
    return [slug, product ? toProductCard(product) : null];
  } catch (error) {
    return error instanceof api.ApiError && error.status === 404 ? [slug, null] : null;
  }
};

/** Свіжі ціна й залишок для «Обраного». `null` — товару вже немає; збій бекенду — slug просто відсутній. */
export const getFavoriteProducts = async (slugs: unknown): Promise<Record<string, Product | null>> => {
  const safe = safePathSegments(slugs);
  const found: [string, Product | null][] = [];
  for (let start = 0; start < safe.length; start += FAVORITES_BATCH) {
    const batch = await Promise.all(safe.slice(start, start + FAVORITES_BATCH).map(favoriteCard));
    found.push(...batch.filter((entry): entry is [string, Product | null] => entry !== null));
  }
  return Object.fromEntries(found);
};

export const getSimilarProducts = (productId: string) =>
  api.getSimilarProducts(productId);

export const getAllProducts = (data: {
  page?: string;
  stockStatus?: string;
  sortByPrice?: string;
  pageSize?: number;
}) => api.getProducts(data);

export const getSearchProducts = (data: {
  searchValue?: string;
  page?: string;
  sortByPrice?: string;
  stockStatus?: string;
  modelId?: string;
}) => api.getProducts(data);

export const getProductsByModel = (data: {
  page?: string;
  sortByPrice?: string;
  stockStatus?: string;
  searchValue?: string;
  modelName?: string;
  pageSize?: number;
}) => {
  const { modelName = "", ...params } = data;
  return api.getProductsByModel(modelName, params);
};

export const getModels = () => api.getModels();

export const getModelDetails = (model: string) => api.getModelDetails(model);

export const getCurrentUser = () => api.getCurrentUser();

export const getAccountOverview = (locale: string) => api.getAccountOverview(locale);

export const getAccountOrders = (locale: string, filter: Parameters<typeof api.getAccountOrders>[1]) =>
  api.getAccountOrders(locale, filter);

export const getAccountOrder = (locale: string, number: string) => api.getAccountOrder(locale, number);

export const updateUser = (values: unknown) => api.updateUser(values);

export const createOrder = (values: unknown) => api.createOrder(values);
