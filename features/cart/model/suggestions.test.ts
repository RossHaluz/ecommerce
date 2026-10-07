import { describe, expect, it } from "vitest";
import type { Product } from "@/lib/types";
import { pickSuggestions, suggestionModel } from "./suggestions";

describe("suggestionModel", () => {
  it("модель першого товару, що її має", () => {
    const items = [
      { id: "a", models: [] },
      { id: "b", models: [{ model: { modelName: "q8-4m-2018-2023" } }] },
    ];
    expect(suggestionModel(items)).toBe("q8-4m-2018-2023");
  });

  it("жоден товар без моделі (універсальні) — нема з чого підбирати", () => {
    expect(suggestionModel([{ id: "a" }])).toBeNull();
    expect(suggestionModel(undefined)).toBeNull();
  });
});

describe("pickSuggestions", () => {
  it("прибирає те, що вже в кошику", () => {
    const products = [{ id: "a" }, { id: "b" }, { id: "c" }] as Product[];
    expect(pickSuggestions(products, [{ id: "b" }]).map((p) => p.id)).toEqual(["a", "c"]);
  });
});
