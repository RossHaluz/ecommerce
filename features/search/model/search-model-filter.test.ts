import { describe, it, expect } from "vitest";
import { searchModelFilter } from "./search-model-filter";

const Q7 = "q7-4m-2015-2019";

describe("searchModelFilter", () => {
  it("narrows an ordinary query to the chosen Audi", () => {
    expect(searchModelFilter("фара", true, Q7)).toBe(Q7);
  });

  it("never narrows an OE number — it already names the part", () => {
    expect(searchModelFilter("4M8941035", true, Q7)).toBeNull();
    expect(searchModelFilter("4M8 941 035", true, Q7)).toBeNull();
  });

  it("does not narrow when switched off or no Audi is chosen", () => {
    expect(searchModelFilter("фара", false, Q7)).toBeNull();
    expect(searchModelFilter("фара", true, null)).toBeNull();
  });
});
