import { describe, expect, it } from "vitest";
import { productHref } from "./product-href";

describe("productHref", () => {
  it("одна адреса на товар, без ?from= — з будь-якого списку той самий кеш переходу", () => {
    expect(productHref("fara-q7")).toBe("/product/fara-q7");
  });
});
