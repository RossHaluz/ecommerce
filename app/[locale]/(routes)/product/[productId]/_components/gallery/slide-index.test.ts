import { describe, expect, it } from "vitest";
import { slideIndexAt } from "./slide-index";

describe("slideIndexAt", () => {
  it("ділить прокрутку на ширину слайда й округлює до найближчого", () => {
    expect(slideIndexAt(0, 390, 4)).toBe(0);
    expect(slideIndexAt(780, 390, 4)).toBe(2);
    expect(slideIndexAt(600, 390, 4)).toBe(2);
    expect(slideIndexAt(500, 390, 4)).toBe(1);
  });

  it("не виходить за межі навіть при пружній прокрутці Safari", () => {
    expect(slideIndexAt(-40, 390, 4)).toBe(0);
    expect(slideIndexAt(2000, 390, 4)).toBe(3);
  });

  it("нульова ширина (ще не відмальовано) — перший слайд, а не NaN", () => {
    expect(slideIndexAt(100, 0, 4)).toBe(0);
    expect(slideIndexAt(100, 390, 0)).toBe(0);
  });
});
