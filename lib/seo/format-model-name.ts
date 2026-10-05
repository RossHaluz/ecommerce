const fullYear = (year: string) => (year.length === 2 ? `20${year}` : year);

/**
 * Назва моделі для заголовків: роки в дужках, «2015–2019» або «2018+».
 * У базі вони записані як завгодно: «Q8 2018- 2023», «A7 4K8 (2019-)», «TOUAREG 11-14».
 */
export function formatModelName(raw: string): string {
  const name = raw.replace(/\s+/g, " ").trim();
  const match = name.match(/^(.*?)\s*\(?\s*(\d{2,4})\s*(-)?\s*(\d{2,4})?\s*\)?$/);
  if (!match || !match[1]) return name;

  const [, base, from, dash, to] = match;
  const years = to ? `${fullYear(from)}–${fullYear(to)}` : dash ? `${fullYear(from)}+` : fullYear(from);
  return `${base} (${years})`;
}
