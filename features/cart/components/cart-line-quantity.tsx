"use client";

import { useDispatch } from "react-redux";
import { setItemQuantity, type OrderItem } from "@/redux/order/slice";
import { maxOrderable } from "@/entities/order-item/model/max-orderable";
import { QuantityStepper } from "./quantity-stepper";

/** Степер рядка кошика: межа — залишок товару, зміна — одразу в кошику. */
export const CartLineQuantity = ({ item, size }: { item: OrderItem; size?: "md" | "lg" }) => {
  const dispatch = useDispatch();

  return (
    <QuantityStepper
      value={item.quantity}
      max={maxOrderable(item.stock)}
      onChange={(quantity) => dispatch(setItemQuantity({ orderItemId: item.orderItemId, quantity }))}
      size={size}
      label={item.title}
    />
  );
};
