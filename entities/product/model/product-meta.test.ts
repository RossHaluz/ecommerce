import { describe, expect, it } from "vitest";
import { buildProductMeta } from "./product-meta";

const product = {
  title: "бампер  задній q7 4m s-line ",
  catalog_number: "4M0807511GRU ",
  quantity: 1,
  models: [{ model: { name: "Q7 4M 2015-2019" } }],
};

describe("buildProductMeta", () => {
  it("puts the OE number first and tidies the product name", () => {
    expect(buildProductMeta(product).title).toBe(
      "4M0807511GRU — Бампер задній q7 4m s-line Audi (Ауді) Q7 4M (2015–2019) | Audiparts"
    );
  });

  it("keeps the title short by naming at most two models", () => {
    const models = ["Q7 4M 2015-2019", "Q7 4M 2020-2024", "Q8 2018- 2023"].map((name) => ({
      model: { name },
    }));

    expect(buildProductMeta({ ...product, models }).title).toContain(
      "Audi (Ауді) Q7 4M (2015–2019), Q7 4M (2020–2024) |"
    );
  });

  it("starts with the name when the product has no OE number", () => {
    expect(buildProductMeta({ ...product, catalog_number: "" }).title).toMatch(
      /^Бампер задній q7 4m s-line Audi/
    );
  });

  it("leaves no dangling space when the product has no models", () => {
    const meta = buildProductMeta({ ...product, models: [] });

    expect(meta.title).toContain("s-line Audi (Ауді) | Audiparts");
    expect(meta.description).toContain("для Audi (Ауді). ");
  });

  it("says in the description whether the part is in stock", () => {
    expect(buildProductMeta(product).description).toContain("В наявності");
    expect(buildProductMeta({ ...product, quantity: 0 }).description).toContain(
      "Під замовлення"
    );
  });

  it("names the part, its OE number and the model in the description", () => {
    expect(buildProductMeta(product).description).toMatch(
      /^Купити бампер задній q7 4m s-line 4M0807511GRU для Audi \(Ауді\) Q7 4M \(2015–2019\)\./
    );
  });
});
