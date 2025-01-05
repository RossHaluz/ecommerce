import React, { FC } from "react";
import Products from "./_components/products";
import NotFoundItems from "@/components/not-found-items";
import { getCategoryDetails } from "@/actions/get-data";
import MainSection from "@/components/main-section";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface CategoryPageProps {
  params: {
    categoryId: string;
    storeId: string;
  };
  searchParams: {
    filterIds: string;
    page: string;
    sortByPrice: string;
    searchValue: string;
    modelId: string;
  };
}

const CategoryPage: FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const { categoryId } = params;
  const { filterIds, page, sortByPrice, modelId } = searchParams;

  const category = await getCategoryDetails({
    categoryId,
    filterIds,
    page,
    pageSize: "10",
    sortByPrice,
    modelId,
  });

  return (
    <MainSection title={category?.category?.name} params={searchParams}>
      {category?.category?.products?.length > 0 ? (
        <Products
          products={category?.category?.products}
          page={category?.meta?.page}
          totalPages={category?.meta?.totalPages}
          searchParams={searchParams}
        />
      ) : (
        <NotFoundItems text="Товарів які відносяться до данної категорії не знайдено..." />
      )}
    </MainSection>
  );
};

export default CategoryPage;
