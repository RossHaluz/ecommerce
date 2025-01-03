import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = `${process.env.BACKEND_URL}/api`;
const storeId = process.env.STORE_ID;

export const getModels = createAsyncThunk("getModels", async (_, thunkApi) => {
  try {
    const { data } = await axios.get(`/model/${storeId}`);

    return data?.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});
