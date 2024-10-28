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

const initialState: OrderState = {
  orderItems: [],
  isLoading: false,
  orderDetails: null,
  _persist: { version: -1, rehydrated: false },
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderDetails(state, action) {
      state.orderDetails = action.payload;
    },
    addItemToCart(state, action: PayloadAction<OrderItem>) {
      const findOrderItem = state.orderItems.find(
        (item) => item.id === action?.payload?.id
      );

      const findTheSameOptions = state.orderItems.find((item) =>
        item?.selectOptions?.every((option) =>
          action.payload?.selectOptions.every(
            (optionItem) => optionItem?.optionValue === option?.optionValue
          )
        )
      );

      if (findOrderItem && findTheSameOptions) {
        findOrderItem.quantity += action.payload.quantity;
        findOrderItem.price =
          Number(findOrderItem.price) + Number(action.payload.price);
      } else {
        state.orderItems.push(action.payload);
      }
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      state.orderItems = state.orderItems.filter(
        (item) => item.orderItemId !== action.payload
      );
    },
    changeProductCount(
      state,
      action: PayloadAction<{ itemId: string; type: "increase" | "decrease" }>
    ) {
      const { itemId, type } = action.payload;
      const findItem = state.orderItems.find(
        (item) => item.orderItemId === itemId
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
} = orderSlice.actions;

export const OrderReducer = orderSlice.reducer;
