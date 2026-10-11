import { describe, expect, it } from "vitest";
import { categoryHref } from "./category-href";

describe("categoryHref", () => {
  it("links the whole category when no model is chosen", () => {
    expect(categoryHref("optyka")).toBe("/categories/optyka");
  });

  it("keeps the model the visitor is browsing", () => {
    expect(categoryHref("optyka", "q7-4m-2015-2019")).toBe("/categories/optyka/q7-4m-2015-2019");
  });
});
