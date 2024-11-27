import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = `${process.env.BACKEND_URL}/api`;
const storeId = process.env.STORE_ID;

export const getCategories = createAsyncThunk(
  "getCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`/category/${storeId}`);

      return data?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
