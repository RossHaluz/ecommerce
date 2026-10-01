import { describe, expect, it } from "vitest";
import { buildProductJsonLd } from "./product-json-ld";

const product = {
  title: "обвіс sq8",
  description: "",
  catalog_number: "4M8807065C GRU",
  article: "3362",
  price: 3500,
  quantity: 1,
  images: [{ url: "3362-1.jpg" }],
};

describe("buildProductJsonLd", () => {
  it("describes the part with its OE number and a USD offer", () => {
    const jsonLd = buildProductJsonLd(product);

    expect(jsonLd).toMatchObject({
      "@type": "Product",
      name: "обвіс sq8",
      description: "обвіс sq8",
      mpn: "4M8807065C GRU",
      sku: "3362",
      brand: { "@type": "Brand", name: "Audi" },
      offers: {
        price: 3500,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    });
    expect(jsonLd.image?.[0]).toMatch(/\/products\/3362-1\.jpg$/);
  });

  it("marks a zero-quantity part as back order, not out of stock", () => {
    expect(buildProductJsonLd({ ...product, quantity: 0 }).offers?.availability).toBe(
      "https://schema.org/BackOrder"
    );
  });

  it("omits the offer for a negotiable (zero) price", () => {
    expect(buildProductJsonLd({ ...product, price: 0 })).not.toHaveProperty("offers");
  });

  it("omits fields the product does not have", () => {
    const jsonLd = buildProductJsonLd({ title: "x", price: 1, quantity: 1 });

    expect(jsonLd).not.toHaveProperty("mpn");
    expect(jsonLd).not.toHaveProperty("sku");
    expect(jsonLd).not.toHaveProperty("image");
  });
});
