import { describe, expect, it } from "vitest";
import type { Product } from "@/lib/types";
import { toFavoriteItem } from "./favorite-item";
import { canBuy, inStockTotal, toFavoriteRow } from "./favorite-status";
import { favoritesShareText } from "./share-text";

const product = (overrides: Partial<Product> = {}): Product => ({
  id: "p1",
  title: "Комплект фар Matrix Q8",
  price: "3600",
  quantity: 1,
  article: "8530",
  product_name: "komplekt-far-q8-8530",
  catalog_number: "4M8941035",
  images: [{ id: "i1", url: "products/a.jpg" }],
  models: [],
  ...overrides,
});

const saved = toFavoriteItem(product({ price: "3900" }));

describe("toFavoriteItem", () => {
  it("keeps only what the list renders, with the price as a number", () => {
    expect(saved).toEqual({
      id: "p1",
      productName: "komplekt-far-q8-8530",
      title: "Комплект фар Matrix Q8",
      image: "products/a.jpg",
      catalogNumber: "4M8941035",
      savedPrice: 3900,
    });
  });
});

describe("toFavoriteRow", () => {
  it("shows the saved snapshot while fresh data loads", () => {
    expect(toFavoriteRow(saved, undefined)).toMatchObject({ availability: "loading", price: 3900 });
  });

  it("marks a product that left the site as unavailable", () => {
    const row = toFavoriteRow(saved, null);
    expect(row.availability).toBe("unavailable");
    expect(canBuy(row)).toBe(false);
  });

  it("reports a price drop against the price at the moment of saving", () => {
    expect(toFavoriteRow(saved, product())).toMatchObject({ availability: "inStock", price: 3600, oldPrice: 3900 });
  });

  it("never calls a price increase or a negotiable price a drop", () => {
    expect(toFavoriteRow(saved, product({ price: "4000" })).oldPrice).toBeUndefined();
    expect(toFavoriteRow(saved, product({ price: "0" })).oldPrice).toBeUndefined();
  });

  it("treats zero stock as pre-order, which can still be bought", () => {
    const row = toFavoriteRow(saved, product({ quantity: 0 }));
    expect(row.availability).toBe("preOrder");
    expect(canBuy(row)).toBe(true);
  });
});

describe("inStockTotal", () => {
  it("sums only in-stock rows", () => {
    const rows = [
      toFavoriteRow(saved, product()),
      toFavoriteRow({ ...saved, id: "p2" }, product({ id: "p2", quantity: 0 })),
      toFavoriteRow({ ...saved, id: "p3" }, null),
    ];
    expect(inStockTotal(rows)).toEqual({ count: 1, sum: 3600 });
  });
});

describe("favoritesShareText", () => {
  it("lists every item with its OE number and link", () => {
    expect(favoritesShareText("Мій список:", [saved], "https://audiparts.com.ua")).toBe(
      "Мій список:\n1. Комплект фар Matrix Q8 — OE 4M8941035\nhttps://audiparts.com.ua/product/komplekt-far-q8-8530"
    );
  });
});
