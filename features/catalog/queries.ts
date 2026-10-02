import { getCategories, getModels } from "@/actions/get-data";
import { queryKeys } from "@/lib/query-keys";
import { toMenuCategory, toMenuModel } from "./lib/menu-catalog";

/**
 * Єдине джерело ключів і фетчерів каталогу: їх ділять клієнтські хуки й
 * серверний префетч. Розійдись ключ — сервер нагодує кеш, який клієнт не
 * прочитає, і гідратація знову розійдеться з SSR.
 */
const orThrow = async <T,>(load: Promise<T | null>, what: string): Promise<T> => {
  const data = await load;
  if (!data) throw new Error(`Не вдалось завантажити ${what}`);
  return data;
};

export const categoriesQuery = {
  queryKey: queryKeys.categories(),
  queryFn: async () => (await orThrow(getCategories(), "категорії")).map(toMenuCategory),
};

export const modelsQuery = {
  queryKey: queryKeys.models(),
  queryFn: async () => (await orThrow(getModels(), "моделі")).map(toMenuModel),
};
