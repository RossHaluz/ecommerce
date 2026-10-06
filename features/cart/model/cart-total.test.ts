import { describe, expect, it } from "vitest";
import { cartTotal } from "./cart-total";

describe("cartTotal", () => {
  it("складає суми рядків (price рядка вже з урахуванням кількості), рядки з бекенда бувають текстом", () => {
    expect(cartTotal([{ price: 3500 }, { price: "60" }])).toBe(3560);
  });

  it("порожній кошик — нуль, а не NaN", () => {
    expect(cartTotal([])).toBe(0);
    expect(cartTotal(undefined)).toBe(0);
  });
});
