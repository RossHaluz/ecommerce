import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = `${process.env.BACKEND_URL}/api`;

export const getAllProducts = createAsyncThunk(
  "api/getAllProducts",
  async ({
    page,
    searchParams,
  }: {
    page: number;
    searchParams: {
      searchValue: string;
      stockStatus: string;
      sortByPrice: string;
    };
  }, {rejectWithValue}) => {
  try {
    
      const { data } = await axios.get(`/product/${process.env.STORE_ID}`, {
        params: {
          ...searchParams,
          page,
          pageSize: 52
        },
      });      

      return data?.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
  }
);


export const getCategoryProducts = createAsyncThunk(
  "api/getCategoryProducts",
  async (
    {
      categoryId,
      page,
      modelId,
      searchParams,
    }: {
      categoryId: string;
      page: number;
      modelId?: string,
      searchParams: {
        stockStatus?: string;
        sortByPrice?: string;
        searchValue?: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `/category/${process.env.STORE_ID}/${categoryId}`,
        {
          params: {
            ...searchParams,
            page,
            modelId
          },
        }
      );

      return data?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);


export const getCategoryModelsProducts = createAsyncThunk('api/getCategoryModelsProducts',
  async (
    data: {
      categoryId: string;
      page?: string;
      stockStatus?: string;
      sortByPrice?: string;
      pageSize?: string;
      modelName: string;
    }, {rejectWithValue}
  ) => {
    try {
     const {
       page = 1,
       sortByPrice = "desc",
       pageSize = 50,
       categoryId,
       stockStatus,
       modelName,
     } = data;
      const { data: category } = await axios.get(
        `/category/${process.env.STORE_ID}/${categoryId}/${modelName}`,
        {
          params: {
            page,
            sortByPrice,
            stockStatus,
            pageSize,
          },
        }
      );

      return category?.data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const getProductsByModel = createAsyncThunk("api/getProductsByModel", async (data: {
  page?: string;
  sortByPrice?: string;
  stockStatus?: string;
  searchValue?: string;
  modelName?: string;
  pageSize?: number;
}, {rejectWithValue}) => {
  try {
      const {
        page,
        sortByPrice,
        modelName,
        pageSize,
        searchValue,
        stockStatus,
      } = data;
      const { data: products } = await axios.get(
        `/product/${process.env.STORE_ID}/model/${modelName}`,
        {
          params: {
            page,
            sortByPrice,
            stockStatus,
            pageSize,
            searchValue,
          },
        }
      );

      return products?.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});