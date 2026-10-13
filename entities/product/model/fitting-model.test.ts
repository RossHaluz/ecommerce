import { describe, expect, it } from "vitest";
import { fittingModel } from "./fitting-model";

const models = [
  { id: "1", name: "Q8 2018- 2023", modelName: "q8-2018--2023" },
  { id: "2", name: "Q7 4M 2015-2019", modelName: "q7-4m-2015-2019" },
];

describe("fittingModel", () => {
  it("names the model from the list address in the usual year format", () => {
    expect(fittingModel(models, "q8-2018--2023")).toBe("Q8 (2018–2023)");
  });

  it("promises nothing outside a model list or for an unknown slug", () => {
    expect(fittingModel(models, undefined)).toBeUndefined();
    expect(fittingModel(models, "a6-c8-2019-")).toBeUndefined();
    expect(fittingModel([], "q8-2018--2023")).toBeUndefined();
  });
});
