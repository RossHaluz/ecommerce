import { describe, expect, it } from "vitest";
import { POPULAR_MODEL_SLUGS, pickPopularModels } from "./popular-models";

const model = (modelName: string) => ({ modelName, name: modelName.toUpperCase() });

describe("pickPopularModels", () => {
  it("keeps the curated order, not the API order", () => {
    const [first, second] = POPULAR_MODEL_SLUGS;
    expect(pickPopularModels([model(second), model("a1-s1"), model(first)])).toEqual([model(first), model(second)]);
  });

  it("drops a curated slug the store no longer has", () => {
    expect(pickPopularModels([model("a1-s1")])).toEqual([]);
  });
});
