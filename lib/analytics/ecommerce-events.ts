/** Каталог веде ціни в доларах — так їх і рахує GA4. */
const CURRENCY = "USD";

export interface AnalyticsItem {
  id: string;
  title: string;
  price: number | string;
  quantity?: number;
}

const toGaItem = (item: AnalyticsItem) => ({
  item_id: item.id,
  item_name: item.title,
  price: Number(item.price),
  quantity: item.quantity ?? 1,
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
