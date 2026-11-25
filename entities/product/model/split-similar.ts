// Two rows on a phone: enough choice without pushing the page down.
export const SOLD_BOX_COUNT = 6;

/** On a sold part the best alternatives move up into the «Продано» box; the section below shows the rest. */
export function splitSimilar<T>(similar: T[], isSold: boolean): { inSoldBox: T[]; below: T[] } {
  if (!isSold) return { inSoldBox: [], below: similar };
  return { inSoldBox: similar.slice(0, SOLD_BOX_COUNT), below: similar.slice(SOLD_BOX_COUNT) };
}
