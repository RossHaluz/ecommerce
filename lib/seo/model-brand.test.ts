import { describe, expect, it } from "vitest";
import { brandedModelName, isAudiModel } from "./model-brand";

// Справжні назви з бази на 2026-11-26.
const AUDI = ["Q8 2018- 2023", "A 5 fL (2009-2013)", "А6 С5", "А1 (82А)", "E TRON GT", "E-TRON 2018-", "Q6 Etron", "S7 C8 2018-25", "A1 S1", "Q3 дор"];
const OTHER = ["TOUAREG 2018-", "SKODA OCTAVIA", "Ford", "BMW X5", "PORSCHE CAYENNE 18-21", "Volkswagen ID.7", "Land Rover", "LAMBORGHINI URUS", "Bentley Bentayga", "Mercedes", "Nissan"];

describe("isAudiModel", () => {
  it.each(AUDI)("Audi: %s", (name) => expect(isAudiModel(name)).toBe(true));
  it.each(OTHER)("інша марка: %s", (name) => expect(isAudiModel(name)).toBe(false));

  it("невідома нова марка не стає Audi", () => {
    expect(isAudiModel("Kia Sportage")).toBe(false);
  });
});

describe("brandedModelName", () => {
  it("додає «Audi» лише моделям Audi", () => {
    expect(brandedModelName("Q8 2018- 2023")).toBe("Audi Q8 (2018–2023)");
    expect(brandedModelName("TOUAREG 2018-")).toBe("TOUAREG (2018+)");
    expect(brandedModelName("SKODA OCTAVIA")).toBe("SKODA OCTAVIA");
  });
});
