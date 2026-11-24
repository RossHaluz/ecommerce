import { describe, expect, it } from "vitest";
import uk from "./uk.json";
import pl from "./pl.json";

// Ключ, якого немає в одній мові, next-intl показує як сирий «returns.sections…» — це видно лише на проді.
const shape = (value: unknown): unknown => {
  if (Array.isArray(value)) return `array(${value.length})`;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, shape(inner)]));
  }
  return typeof value;
};

describe("messages", () => {
  it("українська й польська мають однакові ключі та однакову кількість пунктів у списках", () => {
    expect(shape(pl)).toEqual(shape(uk));
  });
});
