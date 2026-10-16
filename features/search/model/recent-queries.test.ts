import { describe, it, expect } from "vitest";
import { RECENT_LIMIT, addRecentQuery, parseRecentQueries, removeRecentQuery } from "./recent-queries";

describe("recent queries", () => {
  it("puts the latest first and drops a repeat regardless of case", () => {
    expect(addRecentQuery(["фара q8", "бампер"], "Бампер")).toEqual(["Бампер", "фара q8"]);
  });

  it("keeps only the newest few", () => {
    const many = Array.from({ length: RECENT_LIMIT }, (_, i) => `q${i}`);
    expect(addRecentQuery(many, "new")).toHaveLength(RECENT_LIMIT);
    expect(addRecentQuery(many, "new")[0]).toBe("new");
  });

  it("removes one query", () => {
    expect(removeRecentQuery(["a", "b"], "a")).toEqual(["b"]);
  });

  it("survives whatever was left in storage", () => {
    expect(parseRecentQueries(null)).toEqual([]);
    expect(parseRecentQueries("not json")).toEqual([]);
    expect(parseRecentQueries('{"a":1}')).toEqual([]);
    expect(parseRecentQueries('["фара", 3, "бампер"]')).toEqual(["фара", "бампер"]);
  });
});
