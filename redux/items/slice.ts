import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getCategoryProducts } from "./operetions";
import { Product, ProductsResponse } from "@/actions/get-data";

const initialState: {
  isLoading: boolean;
  items: Product[];
  totalPages: number;
  currentPage: number;
  searchParams: Record<string, any>;
} = {
  isLoading: false,
  items: [],
  searchParams: {},
  totalPages: 1,
  currentPage: 1,
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
        }
    },
    extraReducers: builder => {
        builder
          .addCase(getAllProducts.pending, (state, __) => {
            state.isLoading = true;
          })
          .addCase(getAllProducts.fulfilled, (state, action) => {
            (state.isLoading = false),
              (state.items = [
                ...state.items,
                ...(action.payload?.products || []),
              ]);
            state.currentPage = action.payload?.meta?.page || state.currentPage;
            state.totalPages =
              action.payload?.meta?.totalPages || state.totalPages;
          })
          .addCase(getAllProducts.rejected, (state) => {
            state.isLoading = false;
          })
          .addCase(getCategoryProducts.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getCategoryProducts.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.items = [...state.items, ...(action.payload?.products || [])]);
        state.currentPage = action.payload?.meta?.page || state.currentPage;
        state.totalPages = action.payload?.meta?.totalPages || state.totalPages;
          })
    }
});

export const { setInitialItems, resetItems } = itemSlice.actions;

export const itemReducer = itemSlice.reducer;