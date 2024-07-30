import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

const setAuthToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthToken = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const registerUser = createAsyncThunk(
  "api/registerUser",
  async (
    params: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post("/auth/api/register", params);
      setAuthToken(data?.newUser?.token);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
