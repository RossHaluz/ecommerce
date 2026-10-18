// Те, чим майже однакові деталі відрізняються («фара ліва matrix q8 usa» проти «фара права laser»).
// Ті самі ознаки бекенд рахує для чипів «Уточніть» (controllers/search/title-facets.js).
const BADGES = [
  { key: "left", test: /(^|\s)лів/ },
  { key: "right", test: /(^|\s)прав/ },
  { key: "set", test: /комплект/ },
  { key: "matrix", test: /matrix/ },
  { key: "laser", test: /laser/ },
  { key: "fullLed", test: /full\s*led/ },
  { key: "facelift", test: /рест/ },
  { key: "usa", test: /usa/ },
] as const;

export type BadgeKey = (typeof BADGES)[number]["key"];

// Більше трьох на фото вже не читаються.
const MAX_BADGES = 3;

/** Ключі бейджів для фото картки, у порядку важливості: сторона, тип, версія. */
export const titleBadges = (title: string): BadgeKey[] => {
  const lowered = title.toLowerCase();
  return BADGES.filter(({ test }) => test.test(lowered))
    .map(({ key }) => key)
    .slice(0, MAX_BADGES);
};
