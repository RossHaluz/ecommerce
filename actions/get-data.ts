"use server";
import axios from "axios";
import { cookies } from "next/headers";

interface Product {
  id: string;
  title: string;
  price: string;
  article: string;
  product_name: string;
  maxPrice: string;
  catalog_number: string;
  productOptions: any[];
  images: {
    id: string;
    url: string;
  }[];
}
[];

interface Meta {
  page: number;
  totalPages: number;
}

export interface ProductsResponse {
  products: Product[];
  meta: Meta;
}

axios.defaults.baseURL = `${process.env.BACKEND_URL}/api`;
const storeId = process.env.STORE_ID;

//Get store details
export const getStoreDetails = async () => {
  try {
    const { data } = await axios.get(`/store/${storeId}`);
    return data?.data;
  } catch (error) {
    console.log("GET_STORE_DETAILS", error);
    return null;
  }
};

//Get categories
export const getCategories = async (limit?: string) => {
  try {
    const { data } = await axios.get(`/category/${storeId}`, {
      params: { limit },
    });

    return data?.data;
  } catch (error) {
    console.log("GET_CATEGORIES", error);
    return null;
  }
};

//Get best seller products
export const getBestSellersProducts = async () => {
  try {
    const { data } = await axios.get(`/product/${storeId}/best`, {});

    return data?.data;
  } catch (error) {
    console.log("GET_BEST_PRODUCTS", error);
    return null;
  }
};

//Get category details
export const getCategoryDetails = async (data: {
  categoryId: string;
  filterIds?: string;
  page?: string;
  sortByPrice?: string;
  pageSize?: string;
  modelId?: string;
}) => {
  const tokenCookie = cookies().get("token");
  const token = tokenCookie ? tokenCookie.value : null;
  try {
    const {
      filterIds,
      page = 1,
      sortByPrice = "desc",
      pageSize = 30,
      categoryId,
      modelId,
    } = data;
    const { data: category } = await axios.get(
      `/category/${storeId}/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          filterIds,
          sortByPrice,
          pageSize,
          modelId,
        },
      }
    );

    return category?.data;
  } catch (error) {
    console.log("GET_CATEGORY_DATEILS", error);
    return null;
  }
};

//Get category by model
export const getCategoryByModel = async (data: {
  categoryId: string;
  page?: string;
  sortByPrice?: string;
  pageSize?: string;
  modelName: string;
}) => {
  const tokenCookie = cookies().get("token");
  const token = tokenCookie ? tokenCookie.value : null;
  try {
    const {
      page = 1,
      sortByPrice = "desc",
      pageSize = 30,
      categoryId,
      modelName,
    } = data;
    const { data: category } = await axios.get(
      `/category/${storeId}/${categoryId}/${modelName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          sortByPrice,
          pageSize,
        },
      }
    );

    return category?.data;
  } catch (error) {
    console.log("GET_CATEGORY_DATEILS", error);
    return null;
  }
};

//Get filters by category
export const getFiltersByCategory = async (categoryId: string) => {
  try {
    const { data } = await axios.get(
      `/category/${storeId}/${categoryId}/filters`
    );

    return data?.data;
  } catch (error) {
    console.log("GET_FILTERS_BY_CATEGORY", error);
    return null;
  }
};

//Get product details
export const getProductDetails = async (productId: string) => {
  try {
    const { data } = await axios.get(`/product/${storeId}/${productId}`);
    return data?.data;
  } catch (error) {
    console.log("GET_PRODUCT_DETAILS", error);
    return null;
  }
};

//Get similar products
export const getSimilarProducts = async (productId: string) => {
  try {
    const { data } = await axios.get(
      `/product/${storeId}/${productId}/similar-products`
    );

    return data?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//Get current user
export const getCurrentUser = async () => {
  const tokenCookie = cookies().get("token");
  const token = tokenCookie ? tokenCookie.value : null;

  try {
    const { data } = await axios.get("/auth/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data?.data?.user;
  } catch (error) {
    // console.log("GET_CURRENT_USER", error);
    return null;
  }
};

//Create order
export const createOrder = async (values: any) => {
  const tokenCookie = cookies().get("token");
  const token = tokenCookie ? tokenCookie.value : null;
  try {
    const { data } = await axios.post(`/order/${storeId}/create`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data?.data;
  } catch (error) {
    console.log("CREATE_ORDER", error);
    return null;
  }
};

//Search products
export const getSearchProducts = async (data: {
  searchValue?: string;
  page?: string;
  sortByPrice?: string;
  modelId?: string;
}) => {
  try {
    const { modelId, searchValue, page, sortByPrice } = data;
    const { data: products } = await axios.get(`/product/${storeId}`, {
      params: {
        searchValue,
        modelId,
        page,
        sortByPrice,
      },
    });

    return products?.data;
  } catch (error) {
    console.log("SEARCH_PRODUCTS", error);
    return null;
  }
};

//Get all products
export const getAllProducts = async (data: {
  filterIds?: string;
  page?: string;
  sortByPrice?: string;
  pageSize?: number;
}): Promise<ProductsResponse | null> => {
  const tokenCookie = cookies().get("token");
  const token = tokenCookie ? tokenCookie.value : null;
  try {
    const { filterIds, page, sortByPrice, pageSize } = data;
    const { data: products } = await axios.get(`/product/${storeId}`, {
      params: {
        filterIds,
        page,
        sortByPrice,
        pageSize,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return products?.data;
  } catch (error) {
    // console.log("GET_ALL_PRODUCTS", error);
    return null;
  }
};

//Get product by model
export const getProductsByModel = async (data: {
  page?: string;
  sortByPrice?: string;
  searchValue?: string;
  modelName?: string;
  pageSize?: number;
}): Promise<ProductsResponse | null> => {
  const tokenCookie = cookies().get("token");
  const token = tokenCookie ? tokenCookie.value : null;
  try {
    const { page, sortByPrice, modelName, pageSize, searchValue } = data;
    const { data: products } = await axios.get(
      `/product/${storeId}/model/${modelName}`,
      {
        params: {
          page,
          sortByPrice,
          pageSize,
          searchValue,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(products);

    return products?.data;
  } catch (error) {
    // console.log("GET_ALL_PRODUCTS", error);
    return null;
  }
};

//Update user
export const updateUser = async (values: any) => {
  const tokenCookie = cookies().get("token");
  const token = tokenCookie ? tokenCookie.value : null;
  try {
    const { data } = await axios.patch(`/auth/update`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data?.data;
  } catch (error) {
    console.log("UPDATE_USER", error);
    return null;
  }
};

//Get model details
export const getModelDetails = async (model: string) => {
  console.log(model);

  try {
    const { data } = await axios.get(`/model/${storeId}/${model}`);

    return data?.data;
  } catch (error) {
    console.log("GET MODEL DETAILS", error);
    return null;
  }
};

//Get all models
export const getModels = async () => {
  try {
    const { data } = await axios.get(`/model/${storeId}`);

    console.log("models", data);

    return data?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
