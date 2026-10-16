import { describe, it, expect } from "vitest";
import { highlightParts } from "./highlight";

describe("highlightParts", () => {
  it("marks every query word found in the title, keeping its case", () => {
    expect(highlightParts("Фара ліва Matrix Q8", "фара q8")).toEqual([
      { text: "Фара", hit: true },
      { text: " ліва Matrix ", hit: false },
      { text: "Q8", hit: true },
    ]);
  });

  it("leaves the title whole when nothing matches or the query is empty", () => {
    expect(highlightParts("Бампер", "фара")).toEqual([{ text: "Бампер", hit: false }]);
    expect(highlightParts("Бампер", " ")).toEqual([{ text: "Бампер", hit: false }]);
  });

  it("treats regex characters in the query as plain text", () => {
    expect(highlightParts("накладка (бленда)", "(бленда")).toEqual([
      { text: "накладка ", hit: false },
      { text: "(бленда", hit: true },
      { text: ")", hit: false },
    ]);
  });
});
