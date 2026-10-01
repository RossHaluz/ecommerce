import { isInStock } from "./is-in-stock";

export interface ProductMetaSource {
  title: string;
  catalog_number?: string | null;
  quantity: number;
  models?: { model?: { name?: string } | null }[];
}

/** Більше двох моделей роздуває заголовок, а Google однаково його обріже. */
const MAX_TITLE_MODELS = 2;

// Назви в базі вводяться вручну: подвійні пробіли, нижній регістр.
const tidy = (text: string) => text.replace(/\s+/g, " ").trim();
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const modelNames = (product: ProductMetaSource) =>
  (product.models ?? [])
    .map((item) => item.model?.name)
    .filter((name): name is string => Boolean(name))
    .map(tidy);

const forAudi = (models: string[]) => tidy(`Audi (Ауді) ${models.join(", ")}`);

/**
 * OE-номер іде першим: за ним шукають найчастіше, а кінець довгого
 * заголовка Google обрізає.
 */
export function buildProductMeta(product: ProductMetaSource) {
  const name = tidy(product.title);
  const oe = tidy(product.catalog_number ?? "");
  const models = modelNames(product);
  const stock = isInStock(product.quantity) ? "В наявності" : "Під замовлення";

  return {
    title: `${oe ? `${oe} — ` : ""}${capitalize(name)} ${forAudi(models.slice(0, MAX_TITLE_MODELS))} | Audiparts`,
    description: `Купити ${name}${oe ? ` ${oe}` : ""} для ${forAudi(models)}. ${stock}. Оригінальна запчастина, доставка Новою поштою по всій Україні за 2–3 дні.`,
  };
}
