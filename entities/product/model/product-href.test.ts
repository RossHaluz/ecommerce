import { describe, expect, it } from "vitest";
import { productHref } from "./product-href";

describe("productHref", () => {
  it("remembers the list page for breadcrumbs", () => {
    expect(productHref("fara-q7", "/categories/optyka")).toBe(
      "/product/fara-q7?from=%2Fcategories%2Foptyka"
    );
  });

  it("adds no 'from' on the home page or in search", () => {
    expect(productHref("fara-q7", "/")).toBe("/product/fara-q7");
    expect(productHref("fara-q7", "/search")).toBe("/product/fara-q7");
    expect(productHref("fara-q7", "/pl/search/audi-q7")).toBe("/product/fara-q7");
  });
});
