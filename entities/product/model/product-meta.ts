import { formatModelName } from "@/lib/seo/format-model-name";
import { isAudiModel } from "@/lib/seo/model-brand";
import { isInStock } from "./is-in-stock";

export interface ProductMetaSource {
  title: string;
  catalog_number?: string | null;
  quantity: number;
  models?: { model?: { name?: string } | null }[];
  isArchived?: boolean;
}

/** Більше двох моделей роздуває заголовок, а Google однаково його обріже. */
const MAX_TITLE_MODELS = 2;

// Назви в базі вводяться вручну: подвійні пробіли, нижній регістр.
const tidy = (text: string) => text.replace(/\s+/g, " ").trim();
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

// Audi першими: заголовок обрізаємо до двох моделей, і чужа марка не має витіснити Audi.
const modelNames = (product: ProductMetaSource) => {
  const names = (product.models ?? []).map((item) => item.model?.name).filter((name): name is string => Boolean(name));
  return [...names.filter(isAudiModel), ...names.filter((name) => !isAudiModel(name))];
};

// «Audi (Ауді)» — перед моделями Audi або коли моделей немає (магазин Audi); Touareg чи Skoda — без нього.
const forModels = (names: string[]) => {
  const audi = names.filter(isAudiModel).map(formatModelName);
  const other = names.filter((name) => !isAudiModel(name)).map(formatModelName);
  const audiPart = audi.length || !other.length ? [`Audi (Ауді) ${audi.join(", ")}`] : [];
  return tidy([...audiPart, ...other].join(", "));
};

/**
 * OE-номер іде першим: за ним шукають найчастіше, а кінець довгого
 * заголовка Google обрізає.
 */
export function buildProductMeta(product: ProductMetaSource) {
  const name = tidy(product.title);
  const oe = tidy(product.catalog_number ?? "");
  const models = modelNames(product);
  const stock = product.isArchived ? "Продано" : isInStock(product.quantity) ? "В наявності" : "Під замовлення";

  return {
    // Продану сторінку лишаємо для старих посилань, але з пошуковика її прибираємо.
    ...(product.isArchived && { robots: { index: false, follow: true } }),
    title: `${oe ? `${oe} — ` : ""}${capitalize(name)} ${forModels(models.slice(0, MAX_TITLE_MODELS))} | Audiparts`,
    description: `Купити ${name}${oe ? ` ${oe}` : ""} для ${forModels(models)}. ${stock}. Оригінальна запчастина, доставка Новою поштою по всій Україні за 2–3 дні.`,
  };
}
