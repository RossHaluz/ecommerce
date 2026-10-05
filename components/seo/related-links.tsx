import { RelatedCategoryLinks, type RelatedCategory } from "./related-category-links";
import { RelatedModelLinks, type RelatedModel } from "./related-model-links";

export interface RelatedLinksData {
  categories: RelatedCategory[];
  models: RelatedModel[];
}

interface RelatedLinksProps {
  related: RelatedLinksData;
  categorySlug: string;
  modelSlug: string;
  categoriesTitle: string;
  modelsTitle: string;
}

/** Перелінковка «деталь + модель»: Google ходить посиланнями, і кожне веде на сторінку з товарами. */
export const RelatedLinks = ({ related, categorySlug, modelSlug, categoriesTitle, modelsTitle }: RelatedLinksProps) => (
  <div className="flex flex-col gap-6 mt-6">
    <RelatedCategoryLinks title={categoriesTitle} categories={related.categories} modelSlug={modelSlug} />
    <RelatedModelLinks title={modelsTitle} models={related.models} categorySlug={categorySlug} />
  </div>
);
