import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getCategoryProducts,
  getCategoryModelsProducts,
  getProductsByModel,
} from "./operetions";
import { Product } from "@/lib/types";

const initialState: {
  isLoading: boolean;
  items: Product[];
  totalPages: number;
  currentPage: number;
  searchParams: Record<string, any>;
  isLoadMore: boolean;
} = {
  isLoading: false,
  items: [],
  searchParams: {},
  totalPages: 1,
  currentPage: 1,
  isLoadMore: false
};

const handleFulfilled = (state: typeof initialState, action: any) => {
  
  state.isLoading = false;
  state.items = [...state.items, ...(action.payload?.products || [])];
  state.currentPage = action.payload?.meta?.page || state.currentPage;
  state.totalPages = action.payload?.meta?.totalPages || state.totalPages;
};

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        resetItems: (state) => {
            state.items = [],
            state.currentPage = 1,
            state.totalPages = 1
            state.searchParams = {}
        },
        setInitialItems: (state, action) => {
            const {products, page, totalPages, searchParams} = action.payload
            state.items = products,
            state.currentPage = page,
            state.totalPages = totalPages,
            state.searchParams = searchParams
        },
        setCurrentPage: (state, action) => {
          state.currentPage = action.payload
        },
        setLoadMore: (state, action) => {
          state.isLoadMore = action.payload
        }
    },
    extraReducers: builder => {
        builder
          .addCase(getAllProducts.pending, (state, __) => {
            state.isLoading = true;
          })
          .addCase(getAllProducts.fulfilled, handleFulfilled)
          .addCase(getAllProducts.rejected, (state) => {
            state.isLoading = false;
          })
          .addCase(getCategoryProducts.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getCategoryProducts.fulfilled, handleFulfilled)
          .addCase(getCategoryModelsProducts.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getCategoryModelsProducts.fulfilled, handleFulfilled)
          .addCase(getProductsByModel.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getProductsByModel.fulfilled, handleFulfilled);
    }
});

export const { setInitialItems, resetItems, setCurrentPage, setLoadMore } =
  itemSlice.actions;

export const itemReducer = itemSlice.reducer;