import { remainingToAdd } from "@/entities/order-item/model/max-orderable";

export type BuyState =
  /** Весь залишок уже в кошику: «Купити» нічого б не додало — ведемо в кошик. */
  | { kind: "inCart"; inCart: number }
  /** maxQuantity — скільки ще можна докласти; степер має сенс, лише коли це більше 1. */
  | { kind: "buy"; maxQuantity: number };

export const buyState = (stock: number | undefined, inCart: number): BuyState => {
  const remaining = remainingToAdd(stock, inCart);
  return remaining === 0 ? { kind: "inCart", inCart } : { kind: "buy", maxQuantity: remaining };
};
