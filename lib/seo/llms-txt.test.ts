import { describe, expect, it } from "vitest";
import { buildLlmsTxt } from "./llms-txt";

const input = {
  siteUrl: "https://audiparts.com.ua",
  categories: [
    { name: "Кузовні частини", category_name: "kuzovni-chastyny" },
    { name: "Оптика", category_name: "optyka" },
  ],
  models: [{ name: "Q7 4M 2015-2019", modelName: "q7-4m-2015-2019" }],
};

describe("buildLlmsTxt", () => {
  it("starts with a single H1 — the llms.txt requirement", () => {
    const text = buildLlmsTxt(input);

    expect(text.startsWith("# Audiparts\n")).toBe(true);
    expect(text.match(/^# /gm)).toHaveLength(1);
  });

  it("links every category and model with absolute URLs", () => {
    const text = buildLlmsTxt(input);

    expect(text).toContain("- [Кузовні частини](https://audiparts.com.ua/categories/kuzovni-chastyny)");
    expect(text).toContain("- [Оптика](https://audiparts.com.ua/categories/optyka)");
    expect(text).toContain("- [Q7 4M 2015-2019](https://audiparts.com.ua/q7-4m-2015-2019)");
  });

  it("skips models without a slug", () => {
    expect(buildLlmsTxt({ ...input, models: [{ name: "", modelName: "" }] })).not.toContain("](https://audiparts.com.ua/)");
  });
});
