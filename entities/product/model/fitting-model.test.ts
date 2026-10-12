import { describe, expect, it } from "vitest";
import { fittingModel } from "./fitting-model";

const models = [
  { model: { id: "1", name: "Q8 2018- 2023", modelName: "q8-2018--2023" } },
  { model: { id: "2", name: "Q7 4M 2015-2019", modelName: "q7-4m-2015-2019" } },
];

describe("fittingModel", () => {
  it("names the browsed model in the usual year format", () => {
    expect(fittingModel(models, "q8-2018--2023")).toBe("Q8 (2018–2023)");
  });

  it("promises nothing outside a model page or for another model", () => {
    expect(fittingModel(models, undefined)).toBeUndefined();
    expect(fittingModel(models, "a6-c8-2019-")).toBeUndefined();
    expect(fittingModel(undefined, "q8-2018--2023")).toBeUndefined();
  });
});
