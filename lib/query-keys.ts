export interface ProductListIdentity {
  categoryId?: string;
  modelId?: string;
  searchParams: {
    sortByPrice?: string;
    stockStatus?: string;
    searchValue?: string;
  };
}

export const queryKeys = {
  productList: ({ categoryId, modelId, searchParams }: ProductListIdentity) =>
    [
      "products",
      categoryId ?? null,
      modelId ?? null,
      searchParams.sortByPrice ?? null,
      searchParams.stockStatus ?? null,
      searchParams.searchValue ?? null,
    ] as const,
  categories: () => ["categories"] as const,
  currentUser: () => ["current-user"] as const,
  models: () => ["models"] as const,
  cartSuggestions: (modelName: string) => ["cart-suggestions", modelName] as const,
  exchangeRate: (pair: string) => ["exchange-rate", pair] as const,
} as const;
