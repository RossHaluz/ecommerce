import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account", "/checkout", "/search", "/success"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
