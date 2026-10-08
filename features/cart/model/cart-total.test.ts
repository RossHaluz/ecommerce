import { describe, expect, it } from "vitest";
import { cartPieces, cartTotal } from "./cart-total";

describe("cartTotal", () => {
  it("складає суми рядків (price рядка вже з урахуванням кількості), рядки з бекенда бувають текстом", () => {
    expect(cartTotal([{ price: 3500 }, { price: "60" }])).toBe(3560);
  });

  it("порожній кошик — нуль, а не NaN", () => {
    expect(cartTotal([])).toBe(0);
    expect(cartTotal(undefined)).toBe(0);
  });
});

describe("cartPieces", () => {
  it("рахує штуки, а не рядки", () => {
    expect(cartPieces([{ quantity: 1 }, { quantity: 2 }])).toBe(3);
    expect(cartPieces(undefined)).toBe(0);
  });
});
