import { describe, expect, it } from "vitest";
import { DEFAULT_LIST_PARAMS, parseListParams, sameListParams } from "./list-params";

const query = (search: string) => new URLSearchParams(search);

describe("parseListParams", () => {
  it("reads page, sort, stock and search from the address", () => {
    expect(
      parseListParams(query("page=3&sortByPrice=asc&stockStatus=in_stock&searchValue=фара"))
    ).toEqual({ page: 3, sortByPrice: "asc", stockStatus: "in_stock", searchValue: "фара" });
  });

  it("falls back to the first page with no filters", () => {
    expect(parseListParams(query(""))).toEqual(DEFAULT_LIST_PARAMS);
  });

  it("treats a broken page number as the first page", () => {
    expect(parseListParams(query("page=abc")).page).toBe(1);
    expect(parseListParams(query("page=-2")).page).toBe(1);
  });

  it("ignores empty values", () => {
    expect(parseListParams(query("sortByPrice=&stockStatus="))).toEqual(DEFAULT_LIST_PARAMS);
  });
});

describe("sameListParams", () => {
  it("matches the page the server rendered", () => {
    expect(sameListParams(parseListParams(query("")), DEFAULT_LIST_PARAMS)).toBe(true);
  });

  it("differs when the address asks for another page or order", () => {
    expect(sameListParams(parseListParams(query("page=2")), DEFAULT_LIST_PARAMS)).toBe(false);
    expect(sameListParams(parseListParams(query("sortByPrice=asc")), DEFAULT_LIST_PARAMS)).toBe(false);
  });
});
