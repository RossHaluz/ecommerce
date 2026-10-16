export interface SuggestProduct {
  id: string;
  slug: string;
  title: string;
  catalogNumber: string;
  quantity: number;
  image: string | null;
  /** 0 — «Ціна договірна». */
  price: number;
}

export interface SuggestCategory {
  slug: string;
  name: string;
  parentName: string | null;
  count: number;
}

export interface SearchSuggestions {
  total: number;
  products: SuggestProduct[];
  categories: SuggestCategory[];
}

export const NO_SUGGESTIONS: SearchSuggestions = { total: 0, products: [], categories: [] };
