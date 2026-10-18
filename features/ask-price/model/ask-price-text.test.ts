import { describe, it, expect } from "vitest";
import { askPriceText } from "./ask-price-text";

describe("askPriceText", () => {
  it("names the part, its numbers and its page so the manager opens exactly it", () => {
    expect(
      askPriceText({ title: "фара ліва matrix q8", catalog_number: "4M8941035", article: "8530", product_name: "fara-liva-matrix-q8-8530" }),
    ).toBe("Ціна: Фара ліва matrix Q8, OE 4M8941035, арт. 8530, https://audiparts.com.ua/product/fara-liva-matrix-q8-8530");
  });

  it("leaves out numbers the part does not have", () => {
    expect(askPriceText({ title: "фара", product_name: "fara" })).toBe("Ціна: Фара, https://audiparts.com.ua/product/fara");
  });
});
