import { describe, expect, it } from "vitest";
import { buyState } from "./buy-state";

describe("buyState", () => {
  it("остання штука вже в кошику — «У кошику», а не «Купити»", () => {
    expect(buyState(1, 1)).toEqual({ kind: "inCart", inCart: 1 });
    expect(buyState(3, 3)).toEqual({ kind: "inCart", inCart: 3 });
  });

  it("можна ще — скільки саме", () => {
    expect(buyState(3, 1)).toEqual({ kind: "buy", maxQuantity: 2 });
    expect(buyState(1, 0)).toEqual({ kind: "buy", maxQuantity: 1 });
  });

  it("«під замовлення» — купувати можна завжди", () => {
    expect(buyState(0, 5)).toEqual({ kind: "buy", maxQuantity: Infinity });
  });
});
