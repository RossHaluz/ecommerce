import { describe, expect, it } from "vitest";
import { groupModels, seriesOf } from "./model-series";

const model = (name: string) => ({ id: name, name, modelName: name.toLowerCase().replace(/\s+/g, "-") });

describe("seriesOf", () => {
  it.each([
    ["Q7 4M 2015-2019", "Q7"],
    ["А3 2017-2020", "A3"],
    ["А6 С5", "A6"],
    ["Q8 E-tron 2024", "Q8"],
    ["E-TRON 2018-", "e-tron"],
    ["E TRON GT", "e-tron GT"],
    ["RS 6 C8", "RS6"],
  ])("%s → %s", (name, series) => {
    expect(seriesOf(name)).toBe(series);
  });

  it.each(["BMW X5", "TOUAREG 11-14", "Nissan"])("%s is not an Audi series", (name) => {
    expect(seriesOf(name)).toBeUndefined();
  });
});

describe("groupModels", () => {
  it("groups Audi generations under their series and keeps other brands apart", () => {
    const grouped = groupModels([model("Q7 4M 2020-2024"), model("BMW X5"), model("A4 B9 2016-2022"), model("Q7 4L 2010-2015")]);

    expect(grouped.audi.map((series) => series.key)).toEqual(["A4", "Q7"]);
    expect(grouped.audi[1].models.map((m) => m.name)).toEqual(["Q7 4L 2010-2015", "Q7 4M 2020-2024"]);
    expect(grouped.others.map((m) => m.name)).toEqual(["BMW X5"]);
  });

  it("skips models without a name", () => {
    expect(groupModels([model("  "), model("BMW X5")]).others.map((m) => m.name)).toEqual(["BMW X5"]);
  });

  it("orders series numerically, so A10 never lands before A4", () => {
    expect(groupModels([model("A10"), model("A4")]).audi.map((series) => series.key)).toEqual(["A4", "A10"]);
  });
});
