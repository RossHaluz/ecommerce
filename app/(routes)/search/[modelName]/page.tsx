import { FC } from "react";
import Products from "../../_components/products";
import NotFoundItems from "@/components/not-found-items";
import { getProductsByModel, getSearchProducts } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface SearchPageProps {
  params: {
    modelName: string;
  };
  searchParams: {
    filterIds: string;
    page: string;
    sortByPrice: string;
    searchValue: string;
  };
}

export const metadata: Metadata = {
  title: "Пошук",
  robots: {
    index: false,
    follow: true,
  },
};

const SearchPage: FC<SearchPageProps> = async ({ searchParams, params }) => {
  const { page, sortByPrice, searchValue } = searchParams;
  const { modelName } = params;

  const data = await getProductsByModel({
    searchValue,
    page,
    sortByPrice,
    modelName,
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
