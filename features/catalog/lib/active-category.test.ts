import { describe, expect, it } from "vitest";
import type { Category } from "@/lib/types";
import { activeCategory } from "./active-category";

const category = (slug: string, children: Category[] = []) => ({ id: slug, name: slug, category_name: slug, children }) as unknown as Category;
const tree = [category("optyka", [category("fary-peredni"), category("fonari-zadni")]), category("dvygun")];

describe("activeCategory", () => {
  it("finds a top-level category", () => {
    expect(activeCategory(tree, "dvygun").root?.category_name).toBe("dvygun");
  });

  it("for a subcategory returns it with its parent to expand", () => {
    const { root, child } = activeCategory(tree, "fonari-zadni");
    expect(root?.category_name).toBe("optyka");
    expect(child?.category_name).toBe("fonari-zadni");
  });

  it("nothing is active outside a category page or for an unknown slug", () => {
    expect(activeCategory(tree, undefined)).toEqual({});
    expect(activeCategory(tree, "nope")).toEqual({});
  });
});
