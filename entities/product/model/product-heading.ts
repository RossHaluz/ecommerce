import { formatModelName } from "@/lib/seo/format-model-name";

export interface ProductHeadingSource {
  title: string;
  models?: { model?: { name?: string } | null }[];
}

const tidy = (text: string) => text.replace(/\s+/g, " ").trim();
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
// Коди з цифрами — моделі й номери (q8, 4m8941035). У базі назви малими, а частину набрано кирилицею («а7 с7»).
const WORD = /[0-9A-Za-zА-Яа-яІіЇїЄєҐґ]+/g;
const CYRILLIC_LOOKALIKES: Record<string, string> = { а: "a", в: "b", е: "e", і: "i", к: "k", м: "m", н: "h", о: "o", р: "p", с: "c", т: "t", х: "x" };
const toLatinCode = (word: string) => {
  if (!/\d/.test(word)) return word;
  const latin = word.toLowerCase().replace(/[авеікмнорстх]/g, (letter) => CYRILLIC_LOOKALIKES[letter]);
  // Слово, де лишилась справжня кирилиця («5шт»), або саме число — не код: не чіпаємо.
  return /^[a-z0-9]+$/.test(latin) && /[a-z]/.test(latin) ? latin.toUpperCase() : word;
};

/** Назва як у людському тексті: з великої літери, коди великими латиницею, без подвійних пробілів. */
export const productTitle = (title: string) => capitalize(tidy(title).replace(WORD, toLatinCode));

/** H1 товару: назва + модель, коли модель одна — так шукають («обвіс sq8 для audi q8»). */
export function buildProductHeading({ title, models = [] }: ProductHeadingSource) {
  const name = productTitle(title);
  const names = models.map((item) => item.model?.name).filter((n): n is string => Boolean(n));
  return names.length === 1 ? `${name} для Audi ${formatModelName(names[0])}` : name;
}
