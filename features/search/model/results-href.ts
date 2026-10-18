/** Сторінка результатів; з моделлю — пошук лише серед її запчастин. */
export const searchResultsHref = (query: string, modelSlug: string | null) => ({
  pathname: modelSlug ? `/search/${modelSlug}` : "/search",
  query: { searchValue: query },
});

export const categoryHref = (slug: string, modelSlug: string | null) =>
  modelSlug ? `/categories/${slug}/${modelSlug}` : `/categories/${slug}`;
