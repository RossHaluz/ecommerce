import type { Model } from "@/lib/types";

export interface ModelSeries {
  key: string;
  models: Model[];
}

export interface GroupedModels {
  audi: ModelSeries[];
  others: Model[];
}

// В адмінці частину назв набрано кирилицею («А3», «А6 С5») — без заміни вони випадали б з серій Audi.
const toLatin = (name: string) => name.toUpperCase().replace(/А/g, "A").replace(/С/g, "C").replace(/Е/g, "E");

const SERIES_PATTERNS: [RegExp, string | null][] = [
  [/^E[- ]?TRON GT/, "e-tron GT"],
  [/^E[- ]?TRON/, "e-tron"],
  [/^(RS ?\d|[AQS]\d{1,2}(?!\d)|TT|R8)/, null],
];

export const seriesOf = (name: string): string | undefined => {
  const latin = toLatin(name.trim());
  for (const [pattern, label] of SERIES_PATTERNS) {
    const match = latin.match(pattern);
    if (match) return label ?? match[0].replace(" ", "");
  }
  return undefined;
};

const byName = (a: Model, b: Model) => a.name.localeCompare(b.name, undefined, { numeric: true });

export const groupModels = (models: readonly Model[]): GroupedModels => {
  const series = new Map<string, Model[]>();
  const others: Model[] = [];

  for (const model of models) {
    // У базі трапляється модель без назви — порожня кнопка нікому не допоможе.
    if (!model.name?.trim()) continue;
    const key = seriesOf(model.name);
    if (!key) others.push(model);
    else series.set(key, [...(series.get(key) ?? []), model]);
  }

  return {
    audi: Array.from(series.entries())
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
      .map(([key, list]) => ({ key, models: [...list].sort(byName) })),
    others: [...others].sort(byName),
  };
};
