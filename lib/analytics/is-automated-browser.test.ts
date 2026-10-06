import { describe, expect, it } from "vitest";
import { isAutomatedBrowser } from "./is-automated-browser";

describe("isAutomatedBrowser", () => {
  it("Playwright, Lighthouse і боти виставляють navigator.webdriver", () => {
    expect(isAutomatedBrowser({ webdriver: true })).toBe(true);
  });

  it("звичайний браузер рахуємо", () => {
    expect(isAutomatedBrowser({ webdriver: false })).toBe(false);
    expect(isAutomatedBrowser({})).toBe(false);
  });
});
