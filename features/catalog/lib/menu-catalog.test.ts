import { describe, expect, it } from "vitest";
import { toMenuCategory, toMenuModel } from "./menu-catalog";

describe("toMenuCategory", () => {
  it("keeps what the menu needs, children included", () => {
    const fromApi = {
      id: "c1",
      name: "Кузовні частини",
      category_name: "kuzovni-chastyny",
      parentId: null,
      storeId: "s1",
      createdAt: "…",
      position: 1,
      _count: { products: 2846 },
      children: [
        { id: "c2", name: "Бампера", category_name: "bampera", parentId: "c1", createdAt: "…", billboard: null },
      ],
    };

    expect(toMenuCategory(fromApi as never)).toEqual({
      id: "c1",
      name: "Кузовні частини",
      category_name: "kuzovni-chastyny",
      parentId: null,
      children: [{ id: "c2", name: "Бампера", category_name: "bampera", parentId: "c1", children: [] }],
    });
  });
});

describe("toMenuModel", () => {
  it("keeps id, name and slug", () => {
    expect(
      toMenuModel({ id: "m1", name: "Q7 4M", modelName: "q7-4m", storeId: "s", createdAt: "…" } as never)
    ).toEqual({ id: "m1", name: "Q7 4M", modelName: "q7-4m" });
  });
});
