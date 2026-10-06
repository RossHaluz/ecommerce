import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site-url";

// Боти навчання ШІ: ~45% запитів, покупців не приводять, а сервер з 1 ГБ падав від них по пам'яті (жовтень 2026).
// Пошукові (Googlebot, bingbot, OAI-SearchBot) сюди не додавати — вони приводять трафік.
export const AI_TRAINING_BOTS = ["GPTBot", "meta-externalagent", "ClaudeBot", "Bytespider"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account", "/checkout", "/search", "/success"],
      },
      { userAgent: AI_TRAINING_BOTS, disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
