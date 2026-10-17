// Кириличні двійники в номері («4м8…»), набраному з української розкладки.
const LOOKALIKES: Record<string, string> = { а: "a", в: "b", с: "c", е: "e", к: "k", м: "m", о: "o", р: "p", т: "t", х: "x", н: "h", і: "i" };

const compact = (text: string) =>
  text
    .toLowerCase()
    .replace(/[\s.-]/g, "")
    .split("")
    .map((char) => LOOKALIKES[char] ?? char)
    .join("");

/** Схоже на OE-номер: 7–20 літер і цифр, із них хоча б 5 цифр (не «фара q8» і не артикул «8530»). */
export const looksLikeOe = (query: string) => {
  const code = compact(query);
  return /^[a-z0-9]{7,20}$/.test(code) && code.replace(/\D/g, "").length >= 5;
};

/**
 * Товари, чий OE-номер збігся повністю. У базі номер часто з кодом кольору через пробіл
 * («4M0853284C T94»), тож рахуємо і весь номер, і його першу частину.
 */
export const exactOeMatches = <T extends { catalog_number?: string }>(products: T[], query: string): T[] => {
  if (!looksLikeOe(query)) return [];
  const wanted = compact(query);
  return products.filter((product) => {
    const number = (product.catalog_number ?? "").trim();
    return Boolean(number) && (compact(number) === wanted || compact(number.split(/\s+/)[0]) === wanted);
  });
};
