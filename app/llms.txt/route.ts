import { getCategories, getModels } from "@/actions/get-data";
import { buildLlmsTxt } from "@/lib/seo/llms-txt";

export const revalidate = 3600;

export async function GET() {
  const [categories, models] = await Promise.all([getCategories(), getModels()]);

  const body = buildLlmsTxt({
    siteUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "https://audiparts.com.ua",
    categories: (categories ?? []).flatMap((c) => [c, ...(c.children ?? [])]),
    models: models ?? [],
  });

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
