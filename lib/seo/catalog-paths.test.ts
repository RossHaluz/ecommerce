import { describe, expect, it } from "vitest";
import { categoryModelPaths, modelPaths } from "./catalog-paths";

const categories = [
  {
    id: "c-body",
    category_name: "kuzovni-chastyny",
    children: [{ id: "c-bumper", category_name: "bampera" }],
  },
  { id: "c-optics", category_name: "optyka" },
];

const q7 = { model: { modelName: "q7-4m-2015-2019" } };
const q8 = { model: { modelName: "q8-2018--2023" } };

describe("categoryModelPaths", () => {
  it("lists only category + model pairs that have a product, subcategories included", () => {
    const products = [
      { categories: [{ categoryId: "c-body" }, { categoryId: "c-bumper" }], models: [q7] },
    ];

    expect(categoryModelPaths(products, categories).sort()).toEqual([
      "/categories/bampera/q7-4m-2015-2019",
      "/categories/kuzovni-chastyny/q7-4m-2015-2019",
    ]);
  });

  it("lists a pair once however many products share it", () => {
    const product = { categories: [{ categoryId: "c-optics" }], models: [q8] };

    expect(categoryModelPaths([product, product], categories)).toEqual([
      "/categories/optyka/q8-2018--2023",
    ]);
  });

  it("skips unknown categories and models without a slug", () => {
    const products = [
      { categories: [{ categoryId: "c-deleted" }], models: [q7] },
      { categories: [{ categoryId: "c-optics" }], models: [{ model: { modelName: "" } }] },
    ];

    expect(categoryModelPaths(products, categories)).toEqual([]);
  });
});

describe("modelPaths", () => {
  it("lists each model that has at least one product", () => {
    const products = [
      { categories: [], models: [q7, q8] },
      { categories: [], models: [q7, { model: { modelName: "" } }] },
    ];

    expect(modelPaths(products).sort()).toEqual(["/q7-4m-2015-2019", "/q8-2018--2023"]);
  });
});
