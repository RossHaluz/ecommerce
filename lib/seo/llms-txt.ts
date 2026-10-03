import { PHONE_NUMBERS } from "@/entities/store/model/contacts";

interface LlmsTxtInput {
  siteUrl: string;
  categories: { name: string; category_name: string }[];
  models: { name: string; modelName: string }[];
}

const link = (label: string, url: string) => `- [${label}](${url})`;

/** /llms.txt — опис магазину для ШІ-асистентів: Markdown з одним H1 (llmstxt.org). */
export function buildLlmsTxt({ siteUrl, categories, models }: LlmsTxtInput): string {
  return [
    "# Audiparts",
    "",
    "> Інтернет-магазин оригінальних запчастин Audi (Хмельницький, Україна). Пошук за назвою деталі, моделлю й кузовом або каталожним (OE) номером. Доставка Новою поштою по всій Україні за 2–3 дні.",
    "",
    "Ціни на сайті — у доларах США, з перемиканням на гривні. Сайт українською, є польська версія: " +
      `${siteUrl}/pl`,
    "",
    "## Категорії",
    ...categories.map((c) => link(c.name, `${siteUrl}/categories/${c.category_name}`)),
    "",
    // Назва як є: у базі ще лишились моделі не Audi, і «Audi Land Rover» було б неправдою.
    "## Моделі",
    ...models.filter((m) => m.modelName).map((m) => link(m.name, `${siteUrl}/${m.modelName}`)),
    "",
    "## Контакти",
    link("Контакти", `${siteUrl}/contacts`),
    ...PHONE_NUMBERS.map((p) => `- Телефон: ${p.display}`),
    "",
    "## Optional",
    link("Sitemap", `${siteUrl}/sitemap.xml`),
    "",
  ].join("\n");
}
