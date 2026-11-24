import { unitPrice, type PricedLine } from "@/entities/order-item/model/unit-price";
import type { Product } from "@/lib/types";

/** Каталог веде ціни в доларах — так їх і рахує GA4. */
const CURRENCY = "USD";

export interface AnalyticsItem extends PricedLine {
  id: string;
  title: string;
  quantity?: number;
  categories?: Product["categories"];
}

// Назви категорій приходять лише в деталях товару; у списках — тільки id, тоді категорії в події немає.
const gaCategories = (categories: AnalyticsItem["categories"]) => {
  const named = (categories ?? []).flatMap(({ category }) => (category?.name ? [category] : []));
  const main = named.find((category) => !category.parentId);
  const sub = named.find((category) => category.parentId);
  return {
    ...(main && { item_category: main.name }),
    ...(sub && { item_category2: sub.name }),
  };
};

const toGaItem = (item: AnalyticsItem) => ({
  item_id: item.id,
  item_name: item.title,
  price: unitPrice(item),
  quantity: item.quantity ?? 1,
  ...gaCategories(item.categories),
});

/** Параметри для view_item, add_to_cart і begin_checkout — стандартна форма GA4 e-commerce. */
export function cartEvent(items: AnalyticsItem[]) {
  const gaItems = items.map(toGaItem);
  return {
    currency: CURRENCY,
    value: gaItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    items: gaItems,
  };
}

export type CheckoutType = "checkout" | "one_click";

export function purchaseEvent(orderNumber: number | string, items: AnalyticsItem[], checkoutType: CheckoutType) {
  return { transaction_id: String(orderNumber), checkout_type: checkoutType, ...cartEvent(items) };
}
