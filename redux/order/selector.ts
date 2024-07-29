import { RootState } from "../rootReducer";

export const selectOrderItems = (state: RootState) => state.order.orderItems;

export const selectOrderDetails = (state: RootState) =>
  state.order.orderDetails;
