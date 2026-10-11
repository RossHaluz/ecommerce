// Людина вже на сторінці моделі — категорія відкривається одразу для неї, а не для всіх Audi.
export const categoryHref = (categoryName: string, modelName?: string) =>
  modelName ? `/categories/${categoryName}/${modelName}` : `/categories/${categoryName}`;
