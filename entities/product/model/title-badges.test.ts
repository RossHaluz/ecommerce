import { describe, it, expect } from "vitest";
import { titleBadges } from "./title-badges";

describe("titleBadges", () => {
  it("shows side, type and version in that order", () => {
    expect(titleBadges("фара ліва matrix q8 usa")).toEqual(["left", "matrix", "usa"]);
    expect(titleBadges("Комплект фар Q8 рест laser")).toEqual(["set", "laser", "facelift"]);
  });

  it("keeps at most three", () => {
    expect(titleBadges("фара права full led q8 рест usa")).toEqual(["right", "fullLed", "facelift"]);
  });

  it("does not mistake a word that merely contains «прав» or «лів»", () => {
    expect(titleBadges("справжній бампер")).toEqual([]);
    expect(titleBadges("кут фари q7 q8")).toEqual([]);
  });
});
