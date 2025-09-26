import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistPartial } from "redux-persist/es/persistReducer";

interface Option {
  id: string;
  option: string;
  optionValue: string;
  price: string;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  priceForOne: number;
  orderItemId: string;
  selectOptions: Option[];
  productPrices: {
    id: string;
    drop_price: number;
    retail_price: number;
  }[];
  title: string;
  article: string;
  images: {
    id: string;
    url: string;
  }[];
}

export interface OrderState extends PersistPartial {
  orderItems: OrderItem[];
  isLoading: boolean;
  orderDetails: any;
}

const initialState: any = {
  orderItems: [],
  isLoading: false,
  orderDetails: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderDetails(state, action) {
      state.orderDetails = action.payload;
    },
    addItemToCart(state, action) {

      const findOrderItem = state.orderItems.find(
        (item: any) => item.id === action?.payload?.id
      );

      // const findTheSameOptions = state.orderItems.find((item: any) =>
      //   item?.selectOptions?.every((option: any) =>
      //     action.payload?.selectOptions.every(
      //       (optionItem: any) => optionItem?.optionValue === option?.optionValue
      //     )
      //   )
      // );

      if (findOrderItem) {
        findOrderItem.quantity += action.payload.quantity;
        findOrderItem.price =
          Number(findOrderItem.price) + Number(action.payload.price);
      } else {
        state.orderItems.push(action.payload);
      }
    },
    currentPriceOrderItems(state, action) {
      const userType = action.payload.userType;

      state.orderItems = state.orderItems?.map((item: OrderItem) => {
        const newPrice =
          userType === "drop"
            ? item?.productPrices[0]?.drop_price
            : item?.productPrices[0]?.retail_price;

        return {
          ...item,
          price: newPrice,
          priceForOne: newPrice,
        };
      });
    },
    removeItemFromCart(state, action) {
      state.orderItems = state.orderItems.filter(
        (item: any) => item.orderItemId !== action.payload
      );
    },
    changeProductCount(
      state,
      action: PayloadAction<{ itemId: string; type: "increase" | "decrease" }>
    ) {
      const { itemId, type } = action.payload;
      const findItem = state.orderItems.find(
        (item: any) => item.orderItemId === itemId
      );
      if (findItem) {
        if (type === "increase") {
          findItem.quantity += 1;
          findItem.price = Number(findItem.priceForOne) * findItem.quantity;
        } else if (type === "decrease" && findItem.quantity > 1) {
          findItem.quantity -= 1;
          findItem.price = Number(findItem.priceForOne) * findItem.quantity;
        }
      }
    },
    cleareOrderItems(state) {
      state.orderItems = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  changeProductCount,
  setOrderDetails,
  cleareOrderItems,
  currentPriceOrderItems,
} = orderSlice.actions;

export const OrderReducer = orderSlice.reducer;
