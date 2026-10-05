import { describe, expect, it } from "vitest";
import { formatModelName } from "./format-model-name";

describe("formatModelName", () => {
  it.each([
    ["Q7 4M 2015-2019", "Q7 4M (2015–2019)"],
    ["Q8 2018- 2023", "Q8 (2018–2023)"],
    ["Q3 2018-", "Q3 (2018+)"],
    ["A7 4K8 (2019-)", "A7 4K8 (2019+)"],
    ["TOUAREG 11-14", "TOUAREG (2011–2014)"],
    ["Q7 4M 2024", "Q7 4M (2024)"],
    ["E-TRON 2018-", "E-TRON (2018+)"],
  ])("%s → %s", (raw, expected) => {
    expect(formatModelName(raw)).toBe(expected);
  });

  it("leaves a name without years as it is, tidied", () => {
    expect(formatModelName("  Q4  E-TRON ")).toBe("Q4 E-TRON");
    expect(formatModelName("А6 С5")).toBe("А6 С5");
  });
});
