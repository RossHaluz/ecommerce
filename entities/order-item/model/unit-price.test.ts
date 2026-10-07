import { describe, expect, it } from "vitest";
import { unitPrice } from "./unit-price";

describe("unitPrice", () => {
  it("рядок кошика: ціна за штуку, а не сума рядка", () => {
    expect(unitPrice({ price: 60, priceForOne: 30 })).toBe(30);
  });

  it("товар зі сторінки (без priceForOne) — його ціна як є, рядок з бекенда теж", () => {
    expect(unitPrice({ price: "3500" })).toBe(3500);
  });
});
