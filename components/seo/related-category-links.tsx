import { LinkChips } from "./link-chips";

export interface RelatedCategory {
  name: string;
  category_name: string;
}

/** Категорії, де ця модель має товари → сторінки «деталь + модель». */
export const RelatedCategoryLinks = ({
  title,
  categories,
  modelSlug,
}: {
  title: string;
  categories: RelatedCategory[];
  modelSlug: string;
}) => (
  <LinkChips
    title={title}
    links={categories.map((c) => ({
      href: `/categories/${c.category_name}/${modelSlug}`,
      label: c.name.replace(/\s+/g, " ").trim(),
    }))}
  />
);
