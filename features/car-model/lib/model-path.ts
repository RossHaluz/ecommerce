/**
 * Модель — останній сегмент шляху там, де список її розуміє: «/», «/categories/x», «/search».
 * З будь-якої іншої сторінки (товар, кошик) вибір моделі веде на сторінку моделі.
 * `pathname` — без префікса мови (next-intl).
 */
export const modelPath = (pathname: string, currentModel: string | undefined, nextModel: string | undefined) => {
  const segments = pathname.split("/").filter((segment) => segment && segment !== currentModel);
  const isList = segments.length === 0 || (segments[0] === "categories" && segments.length === 2) || (segments[0] === "search" && segments.length === 1);
  const base = isList ? segments : [];
  return `/${[...base, ...(nextModel ? [nextModel] : [])].join("/")}`;
};
