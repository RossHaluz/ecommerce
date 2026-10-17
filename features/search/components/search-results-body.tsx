import type { ReactNode } from "react";
import type { Product } from "@/lib/types";
import { exactOeMatches } from "../model/exact-oe";
import { OeMatchCard } from "./oe-match/oe-match-card";
import { SearchEmptyState } from "./empty/search-empty-state";

interface SearchResultsBodyProps {
  query: string;
  products: Product[];
  /** Список товарів сторінки — його рендерить сама сторінка (пагінація, фільтри). */
  list: ReactNode;
}

/** Спільне для загального пошуку й пошуку в межах моделі: точний збіг за OE зверху, а якщо пусто — заявка. */
export const SearchResultsBody = ({ query, products, list }: SearchResultsBodyProps) => {
  if (!products.length) return <SearchEmptyState query={query} />;

  return (
    <>
      <OeMatchCard matches={exactOeMatches(products, query)} />
      {list}
    </>
  );
};
