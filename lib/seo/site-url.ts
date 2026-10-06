/** Адреса сайту без кінцевого «/» — для canonical, sitemap, robots і JSON-LD. */
export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL ?? "https://audiparts.com.ua").replace(/\/$/, "");
