import { describe, expect, it } from "vitest";
import { isNavigationClick } from "./is-navigation-click";

const current = new URL("https://audiparts.com.ua/categories/bampera");
const click = (over: Partial<Parameters<typeof isNavigationClick>[0]> = {}) => ({
  href: "/product/fara-q7",
  target: "",
  button: 0,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  defaultPrevented: false,
  ...over,
});

describe("isNavigationClick", () => {
  it("is true for a plain click on another page of the site", () => {
    expect(isNavigationClick(click(), current)).toBe(true);
  });

  it("ignores new-tab and modified clicks", () => {
    expect(isNavigationClick(click({ target: "_blank" }), current)).toBe(false);
    expect(isNavigationClick(click({ metaKey: true }), current)).toBe(false);
    expect(isNavigationClick(click({ ctrlKey: true }), current)).toBe(false);
    expect(isNavigationClick(click({ button: 1 }), current)).toBe(false);
  });

  it("ignores other sites, phone links and anchors on the same page", () => {
    expect(isNavigationClick(click({ href: "https://t.me/audiparts" }), current)).toBe(false);
    expect(isNavigationClick(click({ href: "tel:+380673834283" }), current)).toBe(false);
    expect(isNavigationClick(click({ href: "/categories/bampera#top" }), current)).toBe(false);
    expect(isNavigationClick(click({ href: "/categories/bampera" }), current)).toBe(false);
  });

  it("counts the same page with another query as navigation", () => {
    expect(isNavigationClick(click({ href: "/categories/bampera?page=2" }), current)).toBe(true);
  });

  it("ignores clicks a handler already cancelled", () => {
    expect(isNavigationClick(click({ defaultPrevented: true }), current)).toBe(false);
  });
});
