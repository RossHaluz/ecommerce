import { describe, expect, it } from "vitest";
import { DEFAULT_FILTERS, activeFilterCount, filtersQuery, readFilters } from "./list-filters";

describe("readFilters", () => {
  it("reads sort and stock from the address", () => {
    expect(readFilters("?sortByPrice=asc&stockStatus=in_stock")).toEqual({ sort: "asc", stock: "in_stock" });
  });

  it("falls back to defaults for missing or unknown values", () => {
    expect(readFilters("")).toEqual(DEFAULT_FILTERS);
    expect(readFilters("?sortByPrice=random&stockStatus=x")).toEqual(DEFAULT_FILTERS);
  });
});

describe("filtersQuery", () => {
  it("keeps the search, drops the page and omits defaults", () => {
    expect(filtersQuery("?page=4&searchValue=фара", { sort: "asc", stock: "all" })).toBe(
      "?searchValue=%D1%84%D0%B0%D1%80%D0%B0&sortByPrice=asc"
    );
  });

  it("is empty when everything is default", () => {
    expect(filtersQuery("?page=2&sortByPrice=asc", DEFAULT_FILTERS)).toBe("");
  });
});

describe("activeFilterCount", () => {
  it("counts only what differs from the defaults", () => {
    expect(activeFilterCount(DEFAULT_FILTERS)).toBe(0);
    expect(activeFilterCount({ sort: "asc", stock: "pre_order" })).toBe(2);
  });
});
