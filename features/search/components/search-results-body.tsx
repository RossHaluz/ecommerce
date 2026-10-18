import type { ReactNode } from "react";
import type { Product } from "@/lib/types";
import type { SearchFacet } from "../model/types";
import { exactOeMatches } from "../model/exact-oe";
import { OeMatchCard } from "./oe-match/oe-match-card";
import { SearchEmptyState } from "./empty/search-empty-state";
import { NotExactCard } from "./empty/not-exact-card";
import { RefineChips } from "./refine/refine-chips";

interface SearchResultsBodyProps {
  query: string;
  products: Product[];
  total: number;
  facets: SearchFacet[];
  /** Список товарів сторінки — його рендерить сама сторінка (пагінація, фільтри). */
  list: ReactNode;
  /** Пошук у межах моделі: її слаг, щоб уточнення лишались у ній. */
  modelSlug?: string;
}

/**
 * Спільне для загального пошуку й пошуку в межах моделі: кількість і «Уточніть», точний збіг за OE,
 * список, а внизу — заявка для тих, хто не знайшов свого. Порожньо — одразу заявка.
 */
export const SearchResultsBody = ({ query, products, total, facets, list, modelSlug }: SearchResultsBodyProps) => {
  if (!products.length) return <SearchEmptyState query={query} withinModel={Boolean(modelSlug)} />;

  return (
    <>
      <RefineChips query={query} total={total} facets={facets} modelSlug={modelSlug ?? null} />
      <OeMatchCard matches={exactOeMatches(products, query)} />
      {list}
      <NotExactCard query={query} />
    </>
  );
};
