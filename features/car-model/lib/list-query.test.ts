import { describe, expect, it } from "vitest";
import { keptListQuery } from "./list-query";

describe("keptListQuery", () => {
  it("keeps sort, stock and search but drops the page", () => {
    expect(keptListQuery("?page=3&sortByPrice=asc&stockStatus=in_stock&searchValue=фара")).toBe(
      "?sortByPrice=asc&stockStatus=in_stock&searchValue=%D1%84%D0%B0%D1%80%D0%B0"
    );
  });

  it("is empty when nothing worth keeping", () => {
    expect(keptListQuery("?page=2&utm_source=x")).toBe("");
    expect(keptListQuery("")).toBe("");
  });
});
