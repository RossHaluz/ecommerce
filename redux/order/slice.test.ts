import { describe, expect, it } from "vitest";
import { OrderReducer, addItemToCart, setItemQuantity, type OrderItem } from "./slice";

const line = (over: Partial<OrderItem> = {}): OrderItem => ({
  id: "trim",
  orderItemId: "o1",
  quantity: 1,
  stock: 3,
  price: 30,
  priceForOne: 30,
  title: "Накладка дверки",
  article: "1573",
  product_name: "nakladka",
  images: [],
  ...over,
});

const start = (items: OrderItem[] = []) => ({ orderItems: items, isLoading: false, orderDetails: null }) as never;

describe("order slice", () => {
  it("повторне «Купити» додає до того самого рядка й перераховує суму", () => {
    const state = OrderReducer(start([line()]), addItemToCart(line({ orderItemId: "o2" })));
    expect(state.orderItems).toHaveLength(1);
    expect(state.orderItems[0]).toMatchObject({ quantity: 2, price: 60 });
  });

  it("понад залишок не додає, навіть якщо UI пропустив", () => {
    const state = OrderReducer(start([line({ quantity: 3, price: 90 })]), addItemToCart(line({ orderItemId: "o2" })));
    expect(state.orderItems[0]).toMatchObject({ quantity: 3, price: 90 });
  });

  it("зміна кількості — у межах 1…залишок, сума за штуку × кількість", () => {
    let state = OrderReducer(start([line()]), setItemQuantity({ orderItemId: "o1", quantity: 2 }));
    expect(state.orderItems[0]).toMatchObject({ quantity: 2, price: 60 });
    state = OrderReducer(state, setItemQuantity({ orderItemId: "o1", quantity: 9 }));
    expect(state.orderItems[0].quantity).toBe(3);
    state = OrderReducer(state, setItemQuantity({ orderItemId: "o1", quantity: 0 }));
    expect(state.orderItems[0].quantity).toBe(1);
  });

  it("«під замовлення» (залишок 0) — без ліміту", () => {
    const state = OrderReducer(start([line({ stock: 0 })]), setItemQuantity({ orderItemId: "o1", quantity: 5 }));
    expect(state.orderItems[0]).toMatchObject({ quantity: 5, price: 150 });
  });
});
