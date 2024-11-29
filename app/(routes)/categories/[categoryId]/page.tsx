import Section from "@/components/section";
import React, { FC } from "react";
import Products from "./_components/products";
import MobileFilters from "./_components/mobile-filters";
import Filters from "./_components/filters";
import SortProducts from "./_components/sort";
import NotFoundItems from "@/components/not-found-items";
import { getCategoryDetails, getFiltersByCategory } from "@/actions/get-data";
import Subcategories from "./_components/subcategories";
import buildCategoryName from "./_components/buildCategoryName";

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
  };
}

const CategoryPage: FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const { categoryId } = params;
  const { filterIds, page, sortByPrice } = searchParams;

  const category = await getCategoryDetails({
    categoryId,
    filterIds,
    page,
    pageSize: "10",
    sortByPrice,
  });

  const categoryName = await buildCategoryName(category?.category?.id);
  const filters = await getFiltersByCategory(categoryId);

  return (
    <Section title={categoryName}>
      <div className="pt-[10px] pb-[30px] flex flex-col gap-5">
        {category?.category?.children &&
          category?.category?.children?.length > 0 && (
            <Subcategories subcategories={category?.category?.children} />
          )}
        <div className="grid grid-cols-2 gap-[15px] lg:hidden">
          <MobileFilters filters={filters} searchParams={searchParams} />
          <SortProducts searchParams={searchParams} />
        </div>
        <div className="flex items-start gap-10">
          {filters?.length > 0 && (
            <Filters filters={filters} searchParams={searchParams} />
          )}

          <div className="w-full flex flex-col gap-6">
            <div className="w-full hidden lg:flex items-center justify-between">
              <div className="flex items-center gap-10">
                <span className="text-[#484848] text-base">Сортування:</span>
                <SortProducts searchParams={searchParams} />
              </div>

              <h3 className="text-[#484848] text-base font-medium">{`Знайдено: ${
                !category?.category?.products?.length
                  ? 0
                  : category?.category?.products?.length
              } ${
                category?.category?.products?.length > 1 ? "товарів" : "товар"
              }`}</h3>
            </div>
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
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CategoryPage;
