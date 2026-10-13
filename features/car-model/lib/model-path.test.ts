import { describe, expect, it } from "vitest";
import { modelPath } from "./model-path";

describe("modelPath", () => {
  it("adds the model to the list the visitor is on", () => {
    expect(modelPath("/", undefined, "q8")).toBe("/q8");
    expect(modelPath("/categories/optyka", undefined, "q8")).toBe("/categories/optyka/q8");
    expect(modelPath("/search", undefined, "q8")).toBe("/search/q8");
  });

  it("swaps one model for another", () => {
    expect(modelPath("/q7", "q7", "q8")).toBe("/q8");
    expect(modelPath("/categories/optyka/q7", "q7", "q8")).toBe("/categories/optyka/q8");
  });

  it("removes the model to show every model", () => {
    expect(modelPath("/categories/optyka/q7", "q7", undefined)).toBe("/categories/optyka");
    expect(modelPath("/q7", "q7", undefined)).toBe("/");
  });

  it("from a page that has no model list goes to the model page", () => {
    expect(modelPath("/product/fara-8530", undefined, "q8")).toBe("/q8");
    expect(modelPath("/cart", undefined, "q8")).toBe("/q8");
  });
});
