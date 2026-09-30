import { QueryClient, dehydrate } from "@tanstack/react-query";
import { categoriesQuery, modelsQuery } from "./queries";

/**
 * Каталог потрібен шапці/меню на кожній сторінці. Без серверних даних сервер
 * малював порожнє меню, клієнт — заповнене: розбіжність гідратації і меню,
 * невидиме для пошуковика. Помилка бекенду не валить сторінку — клієнт
 * дотягне сам.
 */
export async function prefetchCatalog() {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(categoriesQuery),
    queryClient.prefetchQuery(modelsQuery),
  ]);
  return dehydrate(queryClient);
}
