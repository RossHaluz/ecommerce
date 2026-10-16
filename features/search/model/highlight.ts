export interface TextPart {
  text: string;
  hit: boolean;
}

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Назва, розбита на шматки: `hit` — те, що збіглося зі словами запиту (щоб виділити жирним). */
export const highlightParts = (title: string, query: string): TextPart[] => {
  const words = query.toLowerCase().split(/\s+/).filter((word) => word.length >= 2);
  if (!words.length) return [{ text: title, hit: false }];

  const pattern = new RegExp(`(${words.map(escapeRegExp).join("|")})`, "gi");
  return title
    .split(pattern)
    .filter(Boolean)
    .map((text) => ({ text, hit: words.includes(text.toLowerCase()) }));
};
