import { productHref } from "@/entities/product/model/product-href";
import { productTitle } from "@/entities/product/model/product-heading";
import { SITE_URL } from "@/lib/seo/site-url";

export interface AskPriceSubject {
  title: string;
  catalog_number?: string;
  article?: string;
  product_name: string;
}

/**
 * Що саме цікавить покупця — однаково для заявки менеджеру й для набраного повідомлення у Viber:
 * назва, номери й посилання, щоб менеджер відкрив саме цю деталь, а не шукав її.
 */
export const askPriceText = (product: AskPriceSubject) =>
  [
    `Хочу дізнатися ціну до: ${productTitle(product.title)}`,
    product.catalog_number && `OE ${product.catalog_number}`,
    product.article && `арт. ${product.article}`,
    `${SITE_URL}${productHref(product.product_name)}`,
  ]
    .filter(Boolean)
    .join(", ");
