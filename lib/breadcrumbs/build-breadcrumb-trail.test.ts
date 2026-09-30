import { describe, expect, it } from "vitest";
import latinToCyrillic from "@/utils/transliterate";
import { buildBreadcrumbTrail } from "./build-breadcrumb-trail";

describe("buildBreadcrumbTrail", () => {
  it("keeps /categories/ in the href even though the segment is hidden", () => {
    expect(buildBreadcrumbTrail({ path: "/categories/optyka/audi-q7", lastIsCurrent: true })).toEqual([
      { label: "Оптика", href: "/categories/optyka" },
      { label: latinToCyrillic("audi-q7"), href: null },
    ]);
  });

  it("never shows the locale as a crumb but keeps it in links", () => {
    const trail = buildBreadcrumbTrail({ path: "/pl/categories/optyka/audi-q7", locale: "pl" });
    expect(trail.map((c) => c.label)).not.toContain(latinToCyrillic("pl"));
    expect(trail[0].href).toBe("/pl/categories/optyka");
  });

  it("shows the search query instead of the word 'search'", () => {
    expect(buildBreadcrumbTrail({ path: "/pl/search", locale: "pl", searchValue: "фара" })).toEqual([
      { label: "фара", href: null },
    ]);
    expect(buildBreadcrumbTrail({ path: "/search/audi-q7", searchValue: "фара" })).toEqual([
      { label: "фара", href: null },
    ]);
  });

  it("links every segment of the 'from' path when the product is the current page", () => {
    expect(
      buildBreadcrumbTrail({ path: "/pl/categories/optyka", locale: "pl", lastIsCurrent: false })
    ).toEqual([{ label: "Оптика", href: "/pl/categories/optyka" }]);
  });

  it("returns nothing for the home page", () => {
    expect(buildBreadcrumbTrail({ path: "/" })).toEqual([]);
    expect(buildBreadcrumbTrail({ path: "/pl", locale: "pl", lastIsCurrent: false })).toEqual([]);
  });
});
