import { describe, expect, it } from "vitest";
import { buildProductHeading } from "./product-heading";

const model = (name: string) => ({ model: { name } });

describe("buildProductHeading", () => {
  it("додає модель, під яку шукають, у звичному форматі років", () => {
    expect(buildProductHeading({ title: "обвіс  sq8", models: [model("Q8 2018- 2023")] })).toBe(
      "Обвіс sq8 для Audi Q8 (2018–2023)"
    );
  });

  it("кілька моделей у заголовок не пхає — для них є блок «Підходить до»", () => {
    expect(buildProductHeading({ title: "решітка", models: [model("Q7 4M 2015-2019"), model("Q8 2018- 2023")] })).toBe(
      "Решітка"
    );
    expect(buildProductHeading({ title: "салон", models: [] })).toBe("Салон");
  });
});
