import { getCategories, getModels } from "@/actions/get-data";
import { buildLlmsTxt } from "@/lib/seo/llms-txt";
import { SITE_URL } from "@/lib/seo/site-url";

export const revalidate = 3600;

export async function GET() {
  const [categories, models] = await Promise.all([getCategories(), getModels()]);

  const body = buildLlmsTxt({
    siteUrl: SITE_URL,
    categories: (categories ?? []).flatMap((c) => [c, ...(c.children ?? [])]),
    models: models ?? [],
  });

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
