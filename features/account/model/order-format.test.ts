import { describe, it, expect } from "vitest";
import { formatOrderDate, initials, lineTotal, linesCaption } from "./order-format";
import type { OrderLine } from "./order-types";

const line = (title: string, price = 100, quantity = 1): OrderLine => ({
  title,
  price,
  quantity,
  article: "1",
  oe: "2",
  slug: "s",
  image: null,
});

describe("formatOrderDate", () => {
  it("uses Kyiv time, so a late evening order keeps its own date", () => {
    expect(formatOrderDate("2026-10-21T22:30:00Z", "uk")).toContain("22 жовтня");
  });
});

describe("initials", () => {
  it("takes the first letter of each name and survives a missing one", () => {
    expect(initials("Іван", "Петренко")).toBe("ІП");
    expect(initials("Іван", "")).toBe("І");
    expect(initials("", "")).toBe("");
  });
});

describe("order lines", () => {
  it("multiplies price by quantity", () => {
    expect(lineTotal(line("a", 150, 2))).toBe(300);
  });

  it("names the first part and counts the rest", () => {
    expect(linesCaption([line("Фара"), line("Омивач"), line("Решітка")])).toEqual({ first: "Фара", more: 2 });
    expect(linesCaption([])).toEqual({ first: "", more: 0 });
  });
});
