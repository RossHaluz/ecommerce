import { FC, Suspense } from "react";
import Products from "../_components/products";
import { cookies } from "next/headers";
import NotFoundItems from "@/components/not-found-items";
import { getSearchProducts } from "@/actions/get-data";
import MainSection from "@/components/main-section";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface SearchPageProps {
  searchParams: {
    filterIds: string;
    page: string;
    sortByPrice: string;
    searchValue: string;
    modelId: string;
  };
}

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const { filterIds, page, sortByPrice } = searchParams;
  const searchValue = cookies().get("__search_value")?.value;

  const data = await getSearchProducts({
    searchValue,
    filterIds,
    page,
    sortByPrice,
  });

  return (
    <MainSection
      title={`Результати пошуку: ${searchValue ? searchValue : ""}`}
      shouldBeCategories={false}
      shouldBeModels={false}
      params={searchParams}
    >
      <Suspense fallback={"Loading..."}>
        {data?.products && data?.products?.length > 0 ? (
          <Products
            products={data?.products}
            page={data?.meta?.page}
            totalPages={data?.meta?.totalPages}
            searchParams={searchParams}
          />
        ) : (
          <NotFoundItems text="Товарів які відносяться до вашого запиту не знайдено..." />
        )}
      </Suspense>
    </MainSection>
  );
};

export default SearchPage;
