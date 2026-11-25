import { describe, expect, it } from "vitest";
import { splitSimilar, SOLD_BOX_COUNT } from "./split-similar";

const products = Array.from({ length: 10 }, (_, i) => i);

describe("splitSimilar", () => {
  it("puts the best alternatives into the sold box and the rest below, without repeats", () => {
    const { inSoldBox, below } = splitSimilar(products, true);
    expect(inSoldBox).toEqual(products.slice(0, SOLD_BOX_COUNT));
    expect(below).toEqual(products.slice(SOLD_BOX_COUNT));
  });

  it("leaves everything below for a product on sale", () => {
    expect(splitSimilar(products, false)).toEqual({ inSoldBox: [], below: products });
  });
});
