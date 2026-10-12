import type { Product } from "@/lib/types";
import type { FavoriteItem } from "./favorite-item";

export type FavoriteAvailability = "loading" | "inStock" | "preOrder" | "unavailable";

export interface FavoriteRowView {
  item: FavoriteItem;
  availability: FavoriteAvailability;
  price: number;
  /** Ціна, за якою зберегли, — лише коли поточна нижча. */
  oldPrice?: number;
  /** Свіжий товар: у кошик кладемо його, а не знімок, — там актуальні ціна й залишок. */
  product?: Product;
}

/** `undefined` — ще вантажиться; `null` — товару вже немає на сайті (продано або знято). */
export const toFavoriteRow = (item: FavoriteItem, fresh: Product | null | undefined): FavoriteRowView => {
  if (fresh === undefined) return { item, availability: "loading", price: item.savedPrice };
  if (fresh === null) return { item, availability: "unavailable", price: item.savedPrice };

  const price = Number(fresh.price) || 0;
  return {
    item,
    availability: fresh.quantity > 0 ? "inStock" : "preOrder",
    price,
    oldPrice: price > 0 && price < item.savedPrice ? item.savedPrice : undefined,
    product: fresh,
  };
};

export const canBuy = (row: FavoriteRowView): row is FavoriteRowView & { product: Product } => Boolean(row.product);

/** «Договірна» ціна (0) не додається до суми, але й не ламає її. */
export const inStockTotal = (rows: FavoriteRowView[]) => {
  const inStock = rows.filter((row) => row.availability === "inStock");
  return { count: inStock.length, sum: inStock.reduce((total, row) => total + row.price, 0) };
};
