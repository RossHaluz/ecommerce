import { describe, expect, it } from "vitest";
import { buildProductBreadcrumbs } from "./product-breadcrumbs";

const bumpers = { category: { name: "Бампери", category_name: "bampera", parentId: "body" } };
const body = { category: { name: "Кузовні  частини", category_name: "kuzovni-chastyny", parentId: null } };
const q8 = { model: { name: "Q8 2018- 2023", modelName: "q8-2018--2023" } };

describe("buildProductBreadcrumbs", () => {
  it("батьківська категорія → підкатегорія → підкатегорія для моделі → товар", () => {
    expect(buildProductBreadcrumbs({ title: "Обвіс SQ8", categories: [bumpers, body], models: [q8] })).toEqual([
      { label: "Кузовні частини", href: "/categories/kuzovni-chastyny" },
      { label: "Бампери", href: "/categories/bampera" },
      { label: "Audi Q8 (2018–2023)", href: "/categories/bampera/q8-2018--2023" },
      { label: "Обвіс SQ8", href: null },
    ]);
  });

  it("без категорій і з кількома моделями лишається лише сам товар", () => {
    const q7 = { model: { name: "Q7 4M 2015-2019", modelName: "q7-4m-2015-2019" } };
    expect(buildProductBreadcrumbs({ title: "Салон", categories: [], models: [q8, q7] })).toEqual([
      { label: "Салон", href: null },
    ]);
  });
});
