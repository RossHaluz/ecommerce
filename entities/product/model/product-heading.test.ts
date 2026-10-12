import { describe, expect, it } from "vitest";
import { buildProductHeading, productTitle } from "./product-heading";

const model = (name: string) => ({ model: { name } });

describe("buildProductHeading", () => {
  it("додає модель, під яку шукають, у звичному форматі років", () => {
    expect(buildProductHeading({ title: "обвіс  sq8", models: [model("Q8 2018- 2023")] })).toBe(
      "Обвіс SQ8 для Audi Q8 (2018–2023)"
    );
  });

  it("кілька моделей у заголовок не пхає — для них є блок «Підходить до»", () => {
    expect(buildProductHeading({ title: "решітка", models: [model("Q7 4M 2015-2019"), model("Q8 2018- 2023")] })).toBe(
      "Решітка"
    );
    expect(buildProductHeading({ title: "салон", models: [] })).toBe("Салон");
  });
});

describe("productTitle", () => {
  it("capitalizes and upper-cases latin codes with digits", () => {
    expect(productTitle("комплект фар matrix  q8")).toBe("Комплект фар matrix Q8");
    expect(productTitle("накладка 4m8941035 led")).toBe("Накладка 4M8941035 led");
  });

  it("turns cyrillic look-alike codes into latin", () => {
    expect(productTitle("комплект фар а7 с7 демонтаж")).toBe("Комплект фар A7 C7 демонтаж");
  });

  it("does not touch real words with digits or plain numbers", () => {
    expect(productTitle("диски r20 5шт 2018")).toBe("Диски R20 5шт 2018");
  });

  it("leaves plain words and hyphenated names alone", () => {
    expect(productTitle("бампер s-line дорест")).toBe("Бампер s-line дорест");
  });
});
