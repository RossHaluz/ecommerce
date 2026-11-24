import { describe, expect, it } from "vitest";
import { isPhoneClick } from "./phone-click";

const element = (insidePhoneLink: boolean) => ({
  closest: (selector: string) => (insidePhoneLink && selector === 'a[href^="tel:"]' ? {} : null),
});

describe("isPhoneClick", () => {
  it("рахує клік усередині посилання tel: (і по іконці в ньому)", () => {
    expect(isPhoneClick(element(true))).toBe(true);
  });

  it("не рахує інші кліки й цілі без closest (документ, текстовий вузол)", () => {
    expect(isPhoneClick(element(false))).toBe(false);
    expect(isPhoneClick({})).toBe(false);
    expect(isPhoneClick(null)).toBe(false);
  });
});
