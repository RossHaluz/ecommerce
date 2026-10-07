import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { clampQuantity } from "@/entities/order-item/model/max-orderable";

export interface OrderItem {
  id: string;
  /** Кількість у кошику. Залишок товару — у stock: `...product` раніше перезаписував його тут. */
  quantity: number;
  stock?: number;
  /** Сума рядка (priceForOne × quantity). */
  price: number;
  priceForOne: number;
  orderItemId: string;
  title: string;
  article: string;
  catalog_number?: string;
  product_name: string;
  images: {
    id: string;
    url: string;
  }[];
  models?: { model?: { modelName?: string } }[];
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

const setQuantity = (item: OrderItem, quantity: number) => {
  item.quantity = clampQuantity(quantity, item.stock);
  item.price = Number(item.priceForOne) * item.quantity;
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderDetails(state, action) {
      state.orderDetails = action.payload;
    },
    /** Повторне «Купити» додає до наявного рядка; понад залишок не виходить навіть якщо UI пропустив. */
    addItemToCart(state, action: PayloadAction<OrderItem>) {
      const existing = state.orderItems.find((item: OrderItem) => item.id === action.payload.id);
      if (existing) {
        existing.stock = action.payload.stock ?? existing.stock;
        setQuantity(existing, existing.quantity + action.payload.quantity);
      } else {
        const item = { ...action.payload };
        setQuantity(item, item.quantity);
        state.orderItems.push(item);
      }
    },
    removeItemFromCart(state, action) {
      state.orderItems = state.orderItems.filter((item: OrderItem) => item.orderItemId !== action.payload);
    },
    setItemQuantity(state, action: PayloadAction<{ orderItemId: string; quantity: number }>) {
      const item = state.orderItems.find((line: OrderItem) => line.orderItemId === action.payload.orderItemId);
      if (item) setQuantity(item, action.payload.quantity);
    },
    cleareOrderItems(state) {
      state.orderItems = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, setItemQuantity, setOrderDetails, cleareOrderItems } = orderSlice.actions;

export const OrderReducer = orderSlice.reducer;
