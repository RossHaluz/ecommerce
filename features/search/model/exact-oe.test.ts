import { describe, it, expect } from "vitest";
import { exactOeMatches, looksLikeOe } from "./exact-oe";

const products = [
  { id: "a", catalog_number: "4M8941035" },
  { id: "b", catalog_number: "4M8941035B" },
  { id: "c", catalog_number: "4M0853284C T94" },
  { id: "d", catalog_number: "" },
];
const ids = (list: { id: string }[]) => list.map((item) => item.id);

describe("looksLikeOe", () => {
  it("recognises an OE number however it was typed", () => {
    expect(looksLikeOe("4M8941035")).toBe(true);
    expect(looksLikeOe("4M8 941 035")).toBe(true);
    expect(looksLikeOe("4м8-941-035")).toBe(true);
  });

  it("does not mistake words, a model or an article for one", () => {
    expect(looksLikeOe("фара q8")).toBe(false);
    expect(looksLikeOe("q7 4m")).toBe(false);
    expect(looksLikeOe("8530")).toBe(false);
  });
});

describe("exactOeMatches", () => {
  it("matches the whole number only, not a longer one that starts the same", () => {
    expect(ids(exactOeMatches(products, "4m8 941 035"))).toEqual(["a"]);
  });

  it("matches a number stored with a colour code after a space", () => {
    expect(ids(exactOeMatches(products, "4M0853284C"))).toEqual(["c"]);
    expect(ids(exactOeMatches(products, "4M0853284C T94"))).toEqual(["c"]);
  });

  it("finds nothing for an ordinary query or an empty number", () => {
    expect(exactOeMatches(products, "фара q8")).toEqual([]);
  });
});
