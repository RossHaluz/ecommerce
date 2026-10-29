import { describe, it, expect } from "vitest";
import { formatCountdown } from "./format-countdown";

describe("formatCountdown", () => {
  it("shows minutes and two-digit seconds", () => {
    expect(formatCountdown(42)).toBe("0:42");
    expect(formatCountdown(65)).toBe("1:05");
    expect(formatCountdown(60)).toBe("1:00");
  });

  it("never shows a negative or fractional time", () => {
    expect(formatCountdown(-3)).toBe("0:00");
    expect(formatCountdown(9.8)).toBe("0:09");
  });
});
