import { describe, expect, it } from "vitest";
import { hasStickyBottomBar } from "./has-sticky-bottom-bar";

describe("hasStickyBottomBar", () => {
  it("картка товару й оформлення, у будь-якій мові", () => {
    expect(hasStickyBottomBar("/product/bamper-994")).toBe(true);
    expect(hasStickyBottomBar("/pl/product/bamper-994")).toBe(true);
    expect(hasStickyBottomBar("/checkout")).toBe(true);
    expect(hasStickyBottomBar("/pl/checkout")).toBe(true);
  });

  it("решта сторінок — без панелі", () => {
    expect(hasStickyBottomBar("/")).toBe(false);
    expect(hasStickyBottomBar("/categories/optyka")).toBe(false);
  });
});
