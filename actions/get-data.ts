"use server";

import * as api from "@/lib/api";

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

export const updateUser = (values: unknown) => api.updateUser(values);

export const createOrder = (values: unknown) => api.createOrder(values);
