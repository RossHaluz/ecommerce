import { describe, expect, it } from "vitest";
import { buildAlternates } from "./alternates";

describe("buildAlternates", () => {
  it("points canonical at the page itself, not the home page", () => {
    expect(buildAlternates("/categories/bampera", "uk").canonical).toBe("/categories/bampera");
    expect(buildAlternates("/categories/bampera", "pl").canonical).toBe("/pl/categories/bampera");
  });

  it("lists every language version of the same page", () => {
    expect(buildAlternates("/product/fara-q7", "pl").languages).toEqual({
      "uk-UA": "/product/fara-q7",
      "pl-PL": "/pl/product/fara-q7",
      "x-default": "/product/fara-q7",
    });
  });

  it("handles the home page", () => {
    expect(buildAlternates("/", "uk").canonical).toBe("/");
    expect(buildAlternates("/", "pl").canonical).toBe("/pl");
  });
});
