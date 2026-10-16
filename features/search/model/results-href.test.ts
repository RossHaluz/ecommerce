import { describe, it, expect } from "vitest";
import { categoryHref, productHref, searchResultsHref } from "./results-href";

describe("search links", () => {
  it("searches the whole catalogue, or only one model's parts", () => {
    expect(searchResultsHref("фара", null)).toEqual({ pathname: "/search", query: { searchValue: "фара" } });
    expect(searchResultsHref("фара", "q8-2018--2023")).toEqual({ pathname: "/search/q8-2018--2023", query: { searchValue: "фара" } });
  });

  it("opens a category for the chosen model when there is one", () => {
    expect(categoryHref("fary-peredni", null)).toBe("/categories/fary-peredni");
    expect(categoryHref("fary-peredni", "q8-2018--2023")).toBe("/categories/fary-peredni/q8-2018--2023");
    expect(productHref("komplekt-far")).toBe("/product/komplekt-far");
  });
});
