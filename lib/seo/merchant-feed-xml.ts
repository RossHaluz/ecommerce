import type { MerchantFeedItem } from "@/entities/product/model/merchant-feed-item";

// Control characters (they come in from 1C descriptions) make the whole file invalid XML, so Google reads none of it.
const INVALID_XML_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;

const escapeXml = (text: string) =>
  text
    .replace(INVALID_XML_CHARS, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const tag = (name: string, value: string) => `<g:${name}>${escapeXml(value)}</g:${name}>`;

// 899 = «Vehicles & Parts > Vehicle Parts & Accessories > Motor Vehicle Parts». The id is language-independent,
// and the broad parent category made Google guess the product type itself and mis-flag parts.
const PRODUCT_CATEGORY = "899";

function itemXml(item: MerchantFeedItem) {
  return [
    "<item>",
    tag("id", item.id),
    tag("title", item.title),
    tag("description", item.description),
    tag("link", item.link),
    tag("image_link", item.imageLink),
    ...item.additionalImageLinks.map((url) => tag("additional_image_link", url)),
    tag("price", item.price),
    tag("availability", item.availability),
    tag("condition", item.condition),
    tag("brand", item.brand),
    ...(item.mpn ? [tag("mpn", item.mpn)] : []),
    tag("google_product_category", PRODUCT_CATEGORY),
    ...(item.productType ? [tag("product_type", item.productType)] : []),
    "</item>",
  ].join("");
}

/** Google Merchant Center product feed (RSS 2.0 with the g: namespace). */
export function buildMerchantFeedXml(items: MerchantFeedItem[], { siteUrl }: { siteUrl: string }) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel>',
    `<title>Audiparts</title><link>${escapeXml(siteUrl)}</link><description>Запчастини Audi</description>`,
    ...items.map(itemXml),
    "</channel></rss>",
  ].join("\n");
}
