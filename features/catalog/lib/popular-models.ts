import type { Model } from "@/lib/types";

// Продажів по моделях API не віддає, тож список — рішення магазину; слаг, якого вже нема в базі, просто зникає.
export const POPULAR_MODEL_SLUGS = [
  "q7-4m-2020-2024",
  "q7-4m-2015-2019",
  "a6-c8-2019-",
  "a8-d5-2018-",
  "q5-80a-2021-",
  "a4-b9-2016-2022",
] as const;

export const pickPopularModels = <T extends Pick<Model, "modelName">>(models: readonly T[]): T[] =>
  POPULAR_MODEL_SLUGS.flatMap((slug) => models.find((model) => model.modelName === slug) ?? []);
