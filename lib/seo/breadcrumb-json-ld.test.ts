import { describe, expect, it } from "vitest";
import { buildBreadcrumbJsonLd } from "./breadcrumb-json-ld";

const trail = [
  { label: "Бампери", href: "/categories/bampera" },
  { label: "Обвіс SQ8", href: null },
];

describe("buildBreadcrumbJsonLd", () => {
  it("головна першою, поточна сторінка — останньою, з повними адресами", () => {
    expect(
      buildBreadcrumbJsonLd(trail, { siteUrl: "https://a.test", locale: "uk", homeLabel: "Головна", currentPath: "/product/obvis" })
    ).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Головна", item: "https://a.test/" },
        { "@type": "ListItem", position: 2, name: "Бампери", item: "https://a.test/categories/bampera" },
        { "@type": "ListItem", position: 3, name: "Обвіс SQ8", item: "https://a.test/product/obvis" },
      ],
    });
  });

  it("на польській версії адреси з префіксом /pl", () => {
    const ld = buildBreadcrumbJsonLd(trail, { siteUrl: "https://a.test", locale: "pl", homeLabel: "Strona główna", currentPath: "/product/obvis" });
    expect(ld.itemListElement.map((i) => i.item)).toEqual([
      "https://a.test/pl",
      "https://a.test/pl/categories/bampera",
      "https://a.test/pl/product/obvis",
    ]);
  });
});
