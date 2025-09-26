export const selectItems = (state: any) => state.item?.items;
export const selectIsLoading = (state: any) => state.item?.isLoading;
export const selectPage = (state: any) => state.item?.currentPage;
export const selectSearchParams = (state: any) => state.item.searchParams
export const selectTotalPages = (state: any) => state.item.totalPages;