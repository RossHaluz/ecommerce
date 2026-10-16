import { describe, it, expect } from "vitest";
import { searchQueryOf } from "./search-query";

describe("searchQueryOf", () => {
  it("trims and collapses spaces", () => {
    expect(searchQueryOf("  фара   q8 ")).toBe("фара q8");
  });

  it("refuses too short, too long or non-text input", () => {
    expect(searchQueryOf("ф")).toBeNull();
    expect(searchQueryOf("   ")).toBeNull();
    expect(searchQueryOf("a".repeat(101))).toBeNull();
    expect(searchQueryOf(42)).toBeNull();
    expect(searchQueryOf(undefined)).toBeNull();
  });
});
