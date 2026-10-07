import { describe, expect, it } from "vitest";
import { clampQuantity, maxOrderable, remainingToAdd } from "./max-orderable";

describe("maxOrderable", () => {
  it("у наявності — рівно залишок", () => {
    expect(maxOrderable(1)).toBe(1);
    expect(maxOrderable(3)).toBe(3);
  });

  it("«під замовлення» (0) і невідомий залишок — без ліміту", () => {
    expect(maxOrderable(0)).toBe(Infinity);
    expect(maxOrderable(undefined)).toBe(Infinity);
  });
});

describe("remainingToAdd", () => {
  it("остання штука вже в кошику — 0, більше не додати", () => {
    expect(remainingToAdd(1, 1)).toBe(0);
    expect(remainingToAdd(3, 1)).toBe(2);
    expect(remainingToAdd(3, 5)).toBe(0);
    expect(remainingToAdd(0, 4)).toBe(Infinity);
  });
});

describe("clampQuantity", () => {
  it("не менше 1 і не більше залишку", () => {
    expect(clampQuantity(0, 3)).toBe(1);
    expect(clampQuantity(5, 3)).toBe(3);
    expect(clampQuantity(2, 3)).toBe(2);
    expect(clampQuantity(7, 0)).toBe(7);
  });
});
