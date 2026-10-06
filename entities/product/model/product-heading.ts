import { formatModelName } from "@/lib/seo/format-model-name";

export interface ProductHeadingSource {
  title: string;
  models?: { model?: { name?: string } | null }[];
}

const tidy = (text: string) => text.replace(/\s+/g, " ").trim();
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** H1 товару: назва + модель, коли модель одна — так шукають («обвіс sq8 для audi q8»). */
export function buildProductHeading({ title, models = [] }: ProductHeadingSource) {
  const name = capitalize(tidy(title));
  const names = models.map((item) => item.model?.name).filter((n): n is string => Boolean(n));
  return names.length === 1 ? `${name} для Audi ${formatModelName(names[0])}` : name;
}
