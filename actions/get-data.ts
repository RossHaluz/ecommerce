"use server";
import axios from "axios";
import { cookies } from "next/headers";

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
    const { data } = await axios.get(`/product/${storeId}/best`);

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
}) => {
  const tokenCookie = cookies().get("token");
  const token = tokenCookie ? tokenCookie.value : null;
  try {
    const {
      filterIds,
      page = 1,
      sortByPrice = "desc",
      pageSize = 10,
      categoryId,
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
    console.log("GET_CURRENT_USER", error);
    return null;
  }
};

//Create order
export const createOrder = async (values: any) => {
  try {
    const { data } = await axios.post(`/order/${storeId}/create`, values);

    return data?.data;
  } catch (error) {
    console.log("CREATE_ORDER", error);
    return null;
  }
};

//Search products
export const getSearchProducts = async (data: {
  filterIds?: string;
  searchValue?: string;
  page?: string;
  sortByPrice?: string;
}) => {
  try {
    const { filterIds, searchValue, page, sortByPrice } = data;
    const { data: products } = await axios.get(`/product/${storeId}`, {
      params: {
        searchValue,
        filterIds,
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

    console.log(data);

    return data?.data;
  } catch (error) {
    console.log("UPDATE_USER", error);
    return null;
  }
};
