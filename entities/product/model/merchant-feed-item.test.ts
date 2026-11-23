import { describe, expect, it } from "vitest";
import { toMerchantFeedItem } from "./merchant-feed-item";

const context = { siteUrl: "https://audiparts.com.ua", usdToUahRate: 45.45 };

const product = {
  product_name: "komplekt-far-matrix-q8-4m8941035-8530",
  article: "8530",
  title: "комплект фар matrix  q8",
  description: "ціна вказана без омивачів",
  price: 3600,
  quantity: 1,
  catalog_number: "4M8941035",
  images: [{ url: "8530-1.JPG" }, { url: "8530-2.JPG" }],
  condition: "used" as const,
  models: [{ model: { name: "Q8 2018- 2023" } }],
};

describe("toMerchantFeedItem", () => {
  it("builds the offer the product page shows: same heading, hryvnia price, condition, OE number", () => {
    const item = toMerchantFeedItem(product, context);

    expect(item).toMatchObject({
      id: "8530",
      description: "ціна вказана без омивачів",
      link: "https://audiparts.com.ua/product/komplekt-far-matrix-q8-4m8941035-8530",
      price: "163620 UAH",
      availability: "in_stock",
      condition: "used",
      brand: "Audi",
      mpn: "4M8941035",
    });
    expect(item?.title).toBe("Комплект фар matrix Q8 для Audi Q8 (2018–2023)");
    expect(item?.imageLink).toMatch(/\/products\/8530-1\.JPG$/);
    expect(item?.additionalImageLinks).toHaveLength(1);
  });

  it("uses the title when the product has no description", () => {
    const item = toMerchantFeedItem({ ...product, description: "  " }, context);
    expect(item?.description).toBe(item?.title);
  });

  it("caps extra photos at the 10 Google accepts", () => {
    const images = Array.from({ length: 15 }, (_, i) => ({ url: `${i}.jpg` }));
    expect(toMerchantFeedItem({ ...product, images }, context)?.additionalImageLinks).toHaveLength(10);
  });

  it.each([
    ["a negotiable (zero) price", { price: 0 }],
    ["no photo", { images: [] }],
    ["zero quantity (on order, no date to give Google)", { quantity: 0 }],
    ["an unknown condition, which Google would read as new", { condition: undefined }],
  ])("leaves out a product with %s", (_, change) => {
    expect(toMerchantFeedItem({ ...product, ...change }, context)).toBeNull();
  });

  it("falls back to the slug when the product has no article", () => {
    expect(toMerchantFeedItem({ ...product, article: "" }, context)?.id).toBe(product.product_name);
  });
});
