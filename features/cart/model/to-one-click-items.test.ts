import { describe, expect, it } from "vitest";
import type { OrderItem } from "@/redux/order/slice";
import { toOneClickItems } from "./to-one-click-items";

describe("toOneClickItems", () => {
  it("кожен рядок кошика — товар з кількістю й ціною за штуку", () => {
    const line = { id: "p2", title: "Накладка", article: "1573", quantity: 2, price: 60, priceForOne: 30 } as OrderItem;
    expect(toOneClickItems([line])).toEqual([{ productId: "p2", title: "Накладка", article: "1573", price: 30, quantity: 2 }]);
  });
});
