import Section from "@/components/section";
import axios from "axios";
import React, { FC } from "react";
import Products from "./_components/products";
import MobileFilters from "./_components/mobile-filters";
import Filters from "./_components/filters";
import SortProducts from "./_components/sort";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    filterIds: string;
    maxPrice: string;
    minPrice: string;
    page: string;
    sortByPrice: string;
  };
}

const CategoryPage: FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const { categoryId } = params;
  const { filterIds, maxPrice, minPrice, page, sortByPrice } = searchParams;
  const getObjectKeys = Object.keys(searchParams);

  const { data } = await axios.get(
    `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/categories/${categoryId}?${filterIds ? `filterIds=${filterIds}` : ""}${minPrice ? `&minPrice=${minPrice}` : ""}${maxPrice ? `&maxPrice=${maxPrice}` : ""}${page ? `${getObjectKeys?.length > 1 ? `&page=${page}` : `page=${page}`}` : ""}${sortByPrice ? `${getObjectKeys?.length > 1 ? `&sortByPrice=${sortByPrice}` : `sortByPrice=${sortByPrice}`}` : ""}`
  );
  
  
  const { data: filters } = await axios.get(
    `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/categories/${categoryId}/filters`
  );

  return (
    <Section title={data?.category?.name}>
      <div className="pt-[10px] pb-[30px] flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-[15px] lg:hidden">
          <MobileFilters filters={filters} />
          <SortProducts searchParams={searchParams}/>
        </div>
        <div className="flex items-start gap-10">
          <Filters
            filters={filters}
            rangePrice={{
              minPrice: data?.category?.minPrice,
              maxPrice: data?.category?.maxPrice,
            }}
            searchParams={searchParams}
          />

          <div className="w-full flex flex-col gap-6">
            <div className="w-full hidden lg:flex items-center justify-between">
              <div className="flex items-center gap-10">
                <span className="text-[#484848] text-base">Сортування:</span>
                <SortProducts searchParams={searchParams}/>
              </div>

              <h3 className="text-[#484848] text-base font-medium">{`Знайдено: ${
                data?.category?.products?.length
              } ${data?.category?.products?.length > 1 ? "товарів" : "товар"}`}</h3>
            </div>

            <Products products={data?.category?.products} page={data?.meta?.page}  totalPages={data?.meta?.totalPages} categortId={data?.category?.id} searchParams={searchParams} />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CategoryPage;
