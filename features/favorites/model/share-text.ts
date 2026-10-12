import type { FavoriteItem } from "./favorite-item";

/** Список для менеджера: OE-номер і посилання — з ними він знаходить деталь без уточнень. */
export const favoritesShareText = (heading: string, items: FavoriteItem[], origin: string) =>
  [heading, ...items.map((item, index) => `${index + 1}. ${item.title} — OE ${item.catalogNumber}\n${origin}/product/${item.productName}`)].join(
    "\n"
  );
