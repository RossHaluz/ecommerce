import type { OrderState } from "./slice";

interface RootStateWithOrder {
  order: OrderState;
}

export const selectOrderItems = (state: RootStateWithOrder) =>
  state.order.orderItems;

export const selectOrderDetails = (state: RootStateWithOrder) =>
  state.order.orderDetails;
