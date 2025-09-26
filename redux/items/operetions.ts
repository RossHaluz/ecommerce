import api from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
      const { data } = await api.get(`/api/product/${process.env.STORE_ID}`, {
        params: {
          ...searchParams,
          page,
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
      searchParams,
    }: {
      categoryId: string;
      page: number;
      searchParams: {
        stockStatus?: string;
        sortByPrice?: string;
        searchValue?: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/api/category/${process.env.STORE_ID}/${categoryId}`,
        {
          params: {
            ...searchParams,
            page,
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