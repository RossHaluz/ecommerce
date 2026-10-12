import { describe, expect, it } from "vitest";
import { MAX_FAVORITES_LOOKUP, safeFavoriteSlugs } from "./favorite-slugs";

describe("safeFavoriteSlugs", () => {
  it("keeps clean slugs once", () => {
    expect(safeFavoriteSlugs(["fara-q8-8530", "fara-q8-8530", "bamper_a7-994"])).toEqual(["fara-q8-8530", "bamper_a7-994"]);
  });

  it("drops anything that could escape the API path", () => {
    expect(safeFavoriteSlugs(["../admin", "a/b", "x?y=1", "", 42, null])).toEqual([]);
  });

  it("rejects non-arrays and caps the batch", () => {
    expect(safeFavoriteSlugs("fara")).toEqual([]);
    const many = Array.from({ length: 100 }, (_, i) => `p-${i}`);
    expect(safeFavoriteSlugs(many)).toHaveLength(MAX_FAVORITES_LOOKUP);
  });
});
