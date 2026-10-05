import { formatModelName } from "@/lib/seo/format-model-name";
import { LinkChips } from "./link-chips";

export interface RelatedModel {
  name: string;
  modelName: string;
}

/** Моделі, що мають товари в цій категорії → сторінки «деталь + модель». */
export const RelatedModelLinks = ({
  title,
  models,
  categorySlug,
}: {
  title: string;
  models: RelatedModel[];
  categorySlug: string;
}) => (
  <LinkChips
    title={title}
    links={models.map((m) => ({
      href: `/categories/${categorySlug}/${m.modelName}`,
      label: `Audi ${formatModelName(m.name)}`,
    }))}
  />
);
