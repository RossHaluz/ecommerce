import { describe, expect, it } from "vitest";
import { formatPrice, usdToUah } from "./price";

describe("usdToUah", () => {
  it("rounds to whole hryvnias, as the backend does for the waybill's cash on delivery", () => {
    expect(usdToUah(12.5, 41.55)).toBe(519);
    expect(usdToUah("3500", 41.55)).toBe(145425);
  });
});

describe("formatPrice", () => {
  it("shows hryvnias at the shop rate when the buyer wants UAH", () => {
    expect(formatPrice(12.5, { currency: "UAH", usdToUahRate: 41.55 })).toBe("519 ₴");
  });

  // Node and Chrome disagree on Intl «uk-UA» («₴» vs «грн»); the exact string keeps SSR and hydration identical.
  it("writes the same hryvnia string in every runtime, grouped with non-breaking spaces", () => {
    expect(formatPrice(3600, { currency: "UAH", usdToUahRate: 45.45 })).toBe("163 620 ₴");
    expect(formatPrice(30000, { currency: "UAH", usdToUahRate: 45.45 })).toBe("1 363 500 ₴");
  });

  it("falls back to dollars when there is no rate, instead of showing nothing", () => {
    expect(formatPrice(12.5, { currency: "UAH", usdToUahRate: null })).toBe("$12.50");
  });

  it("shows dollars when the buyer chose USD", () => {
    expect(formatPrice(3500, { currency: "USD", usdToUahRate: 41.55 })).toBe("$3,500.00");
  });
});
