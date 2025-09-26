import { FC } from "react";
import NotFoundItems from "@/components/not-found-items";
import { getSearchProducts } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const Products = dynamic(() => import("@/app/(routes)/_components/products"), {
  ssr: true,
});

interface SearchPageProps {
  searchParams: {
    filterIds: string;
    page: string;
    stockStatus: string;
    sortByPrice: string;
    searchValue: string;
    modelId: string;
  };
}

export const metadata: Metadata = {
  title: "Пошук",
  robots: {
    index: false,
    follow: true,
  },
};

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const { modelId, page, sortByPrice, searchValue, stockStatus } = searchParams;

  const data = await getSearchProducts({
    searchValue,
    page,
    stockStatus,
    sortByPrice,
    modelId,
  });

  return (
    <MainSection
      title={`Результати пошуку: ${searchValue ? searchValue : ""}`}
      shouldBeCategories={false}
      shouldBeModels={false}
      params={searchParams}
    >
      {data?.products && data?.products?.length > 0 ? (
        <Products
          key={searchParams.searchValue}
          products={data?.products}
          page={data?.meta?.page}
          totalPages={data?.meta?.totalPages}
          searchParams={searchParams}
        />
      ) : (
        <NotFoundItems text="Товарів які відносяться до вашого запиту не знайдено..." />
      )}
    </MainSection>
  );
};

export default SearchPage;
