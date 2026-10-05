import { describe, expect, it } from "vitest";
import { formatCategoryName } from "./format-category-name";

describe("formatCategoryName", () => {
  it("прибирає подвійні пробіли, переноси й краї", () => {
    expect(formatCategoryName("  Ліхтарі \n задні  ")).toBe("Ліхтарі задні");
  });
});
