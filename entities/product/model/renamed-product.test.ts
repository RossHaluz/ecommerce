import { describe, expect, it } from "vitest";
import { articleFromSlug, renamedTo } from "./renamed-product";

describe("articleFromSlug", () => {
  it("reads the article every product address ends with", () => {
    expect(articleFromSlug("krylo-q7-4m-prave-4m0821106d-6416")).toBe("6416");
  });

  it("has no article for an address that does not end with digits", () => {
    expect(articleFromSlug("krylo-q7-4m-prave")).toBeNull();
    expect(articleFromSlug("krylo-")).toBeNull();
  });
});

describe("renamedTo", () => {
  it("sends an old address to the product's current one", () => {
    expect(renamedTo("krylo-q7-prave-6416", "krylo-q7-4m-prave-4m0821106d-6416")).toBe("krylo-q7-4m-prave-4m0821106d-6416");
  });

  it("never redirects to the same address or when nothing was found", () => {
    expect(renamedTo("krylo-6416", "krylo-6416")).toBeNull();
    expect(renamedTo("krylo-6416", null)).toBeNull();
  });
});
