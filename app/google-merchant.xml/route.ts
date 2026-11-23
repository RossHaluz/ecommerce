import { getAllProducts } from "@/actions/get-data";
import { fetchShopRate } from "@/lib/api/exchange-rate";
import { toMerchantFeedItem } from "@/entities/product/model/merchant-feed-item";
import { buildMerchantFeedXml } from "@/lib/seo/merchant-feed-xml";
import { SITE_URL } from "@/lib/seo/site-url";

export const revalidate = 3600;

export async function GET() {
  const [data, rate] = await Promise.all([getAllProducts({ pageSize: 10000 }), fetchShopRate()]);

  // An empty feed tells Google every product is gone; an error makes it keep the last one and retry.
  if (!data?.products?.length || !rate) {
    throw new Error("google-merchant.xml: каталог або курс не завантажились");
  }

  const items = data.products
    .map((product) => toMerchantFeedItem(product, { siteUrl: SITE_URL, usdToUahRate: rate.usdToUah }))
    .filter((item) => item !== null);

  return new Response(buildMerchantFeedXml(items, { siteUrl: SITE_URL }), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
