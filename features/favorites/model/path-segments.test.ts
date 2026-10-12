import { describe, expect, it } from "vitest";
import { MAX_FAVORITES_LOOKUP, isSafePathSegment, safePathSegments } from "./path-segments";

describe("safePathSegments", () => {
  it("keeps clean slugs and uuids once", () => {
    expect(safePathSegments(["fara-q8-8530", "fara-q8-8530", "bamper_a7-994", "1dc2cba4-df12-4683-802b-6067769a16d9"])).toEqual([
      "fara-q8-8530",
      "bamper_a7-994",
      "1dc2cba4-df12-4683-802b-6067769a16d9",
    ]);
  });

  it("drops anything that could escape the API path", () => {
    expect(safePathSegments(["../admin", "a/b", "x?y=1", "", 42, null])).toEqual([]);
  });

  it("rejects non-arrays and caps the batch", () => {
    expect(safePathSegments("fara")).toEqual([]);
    const many = Array.from({ length: 100 }, (_, i) => `p-${i}`);
    expect(safePathSegments(many)).toHaveLength(MAX_FAVORITES_LOOKUP);
    expect(safePathSegments(many, 100)).toHaveLength(100);
  });
});

describe("isSafePathSegment", () => {
  it("accepts an id and rejects a traversal", () => {
    expect(isSafePathSegment("1dc2cba4-df12")).toBe(true);
    expect(isSafePathSegment("../x")).toBe(false);
  });
});
