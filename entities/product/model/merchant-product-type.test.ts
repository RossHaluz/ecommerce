import { describe, expect, it } from "vitest";
import { categoryPaths, merchantProductType } from "./merchant-product-type";

const tree = [
  {
    id: "body",
    name: "Кузов",
    children: [
      { id: "lights", name: "Фари" },
      { id: "mirrors", name: "Дзеркала" },
    ],
  },
  { id: "engine", name: "Двигун" },
];

const paths = categoryPaths(tree);

describe("merchantProductType", () => {
  it("names the subcategory with its parent, the way the site's catalog nests them", () => {
    expect(merchantProductType(["lights"], paths)).toBe("Кузов > Фари");
  });

  it("prefers the deepest category when the product sits in the parent too", () => {
    expect(merchantProductType(["body", "lights"], paths)).toBe("Кузов > Фари");
  });

  it("uses a top-level category on its own", () => {
    expect(merchantProductType(["engine"], paths)).toBe("Двигун");
  });

  it("gives nothing for a product with no known category, so the tag is left out", () => {
    expect(merchantProductType([], paths)).toBeUndefined();
    expect(merchantProductType(["archived"], paths)).toBeUndefined();
  });
});
