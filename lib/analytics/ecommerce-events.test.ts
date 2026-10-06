import { describe, expect, it } from "vitest";
import { cartEvent, purchaseEvent } from "./ecommerce-events";

const bumper = { id: "p1", title: "Обвіс SQ8", price: "3500" };
const trim = { id: "p2", title: "Накладка дверки", price: 30, quantity: 2 };

describe("ecommerce-events", () => {
  it("рахує суму з ціни й кількості, ціна з бекенда буває рядком", () => {
    expect(cartEvent([bumper, trim])).toEqual({
      currency: "USD",
      value: 3560,
      items: [
        { item_id: "p1", item_name: "Обвіс SQ8", price: 3500, quantity: 1 },
        { item_id: "p2", item_name: "Накладка дверки", price: 30, quantity: 2 },
      ],
    });
  });

  it("покупка несе номер замовлення — без нього GA4 не зведе дохід і задублює повтор", () => {
    expect(purchaseEvent(1042, [bumper], "one_click")).toMatchObject({
      transaction_id: "1042",
      value: 3500,
      currency: "USD",
      checkout_type: "one_click",
    });
  });
});
