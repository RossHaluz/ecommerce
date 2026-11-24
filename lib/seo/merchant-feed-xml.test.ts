import { describe, expect, it } from "vitest";
import { buildMerchantFeedXml } from "./merchant-feed-xml";
import type { MerchantFeedItem } from "@/entities/product/model/merchant-feed-item";

const item: MerchantFeedItem = {
  id: "8530",
  title: "Комплект фар matrix Q8",
  description: "ціна вказана без омивачів",
  link: "https://audiparts.com.ua/product/komplekt-far-matrix-q8-4m8941035-8530",
  imageLink: "https://api.audiparts.com.ua/products/8530-1.JPG",
  additionalImageLinks: ["https://api.audiparts.com.ua/products/8530-2.JPG"],
  price: "163620 UAH",
  availability: "in_stock",
  condition: "used",
  brand: "Audi",
  mpn: "4M8941035",
};

const build = (items: MerchantFeedItem[]) => buildMerchantFeedXml(items, { siteUrl: "https://audiparts.com.ua" });

describe("buildMerchantFeedXml", () => {
  it("writes an RSS feed with Google's namespace and one item per offer", () => {
    const xml = build([item, { ...item, id: "8531" }]);

    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('xmlns:g="http://base.google.com/ns/1.0"');
    expect(xml.match(/<item>/g)).toHaveLength(2);
    expect(xml).toContain("<g:price>163620 UAH</g:price>");
    expect(xml).toContain("<g:condition>used</g:condition>");
    expect(xml).toContain("<g:mpn>4M8941035</g:mpn>");
    expect(xml).toContain("<g:additional_image_link>https://api.audiparts.com.ua/products/8530-2.JPG</g:additional_image_link>");
  });

  it("escapes XML characters and drops control characters, which would make the whole file unreadable", () => {
    const xml = build([{ ...item, title: 'Фара L&R <USA> "нова"', description: "опис\u0007 з 1С" }]);

    expect(xml).toContain("<g:title>Фара L&amp;R &lt;USA&gt; &quot;нова&quot;</g:title>");
    expect(xml).toContain("<g:description>опис з 1С</g:description>");
  });

  it("files every offer under Motor Vehicle Parts by taxonomy id, not the broad parent category", () => {
    const xml = build([item, { ...item, id: "8531" }]);

    expect(xml.match(/<g:google_product_category>899<\/g:google_product_category>/g)).toHaveLength(2);
  });

  it("leaves out mpn when the part has no OE number", () => {
    expect(build([{ ...item, mpn: undefined }])).not.toContain("<g:mpn>");
  });

  it("writes the site category as product_type, escaped, and skips it when unknown", () => {
    expect(build([{ ...item, productType: "Кузов > Фари" }])).toContain("<g:product_type>Кузов &gt; Фари</g:product_type>");
    expect(build([item])).not.toContain("<g:product_type>");
  });
});
