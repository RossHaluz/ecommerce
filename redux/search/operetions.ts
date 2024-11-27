import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getSearchProducts = createAsyncThunk(
  "getSearchProduct",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(`/product`);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  }
);
