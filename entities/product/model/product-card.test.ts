import { describe, expect, it } from "vitest";
import { toProductCard } from "./product-card";

const fromApi = {
  id: "p1",
  storeId: "s1",
  title: "фара ліва",
  description: "довгий опис…",
  code1c: "",
  price: 3500,
  quantity: 1,
  article: "3362",
  product_name: "fara-liva-3362",
  catalog_number: "4M0941011B",
  createdAt: "2025-01-03T09:47:24.593Z",
  updatedAt: "2026-02-13T13:22:11.578Z",
  productPrices: [{ retail_price: 3500, drop_price: 0 }],
  translations: [],
  productCharacteristics: [],
  categories: [{ categoryId: "c1", createdAt: "…" }],
  images: [
    { id: "i1", url: "3362-1.jpg", position: 1, createdAt: "…" },
    { id: "i2", url: "3362-2.jpg", position: 2, createdAt: "…" },
  ],
  models: [
    { id: "m-link", createdAt: "…", model: { id: "m1", name: "Q7 4M", modelName: "q7-4m", createdAt: "…", storeId: "s1" } },
  ],
};

describe("toProductCard", () => {
  it("keeps exactly what the card, the cart and the order need", () => {
    expect(toProductCard(fromApi as never)).toEqual({
      id: "p1",
      title: "фара ліва",
      price: 3500,
      quantity: 1,
      article: "3362",
      product_name: "fara-liva-3362",
      catalog_number: "4M0941011B",
      images: [{ id: "i1", url: "3362-1.jpg" }],
      models: [{ model: { id: "m1", name: "Q7 4M", modelName: "q7-4m" } }],
    });
  });

  it("copes with a product that has no photo or models", () => {
    const card = toProductCard({ ...fromApi, images: [], models: undefined } as never);

    expect(card.images).toEqual([]);
    expect(card.models).toEqual([]);
  });
});
