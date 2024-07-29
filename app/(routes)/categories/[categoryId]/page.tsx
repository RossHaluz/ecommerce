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
  };
}

const CategoryPage: FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const { categoryId } = params;
  const { filterIds, maxPrice, minPrice } = searchParams;

  const { data } = await axios.get(
    `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/categories/${categoryId}?filterIds=${filterIds}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  );

  const { data: filters } = await axios.get(
    `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/filters`
  );

  return (
    <Section title={data?.name}>
      <div className="pt-[10px] pb-[30px] flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-[15px] lg:hidden">
          <MobileFilters filters={filters} />
          <SortProducts />
        </div>
        <div className="flex items-start gap-10">
          <Filters
            filters={filters}
            rangePrice={{
              minPrice: data?.minPrice,
              maxPrice: data?.maxPrice,
            }}
          />

          <div className="w-full flex flex-col gap-6">
            <div className="w-full hidden lg:flex items-center justify-between">
              <div className="flex items-center gap-10">
                <span className="text-[#484848] text-base">Сортування:</span>
                <SortProducts />
              </div>

              <h3 className="text-[#484848] text-base font-medium">{`Знайдено: ${
                data?.products?.length
              } ${data?.products?.length > 1 ? "товарів" : "товар"}`}</h3>
            </div>

            <Products products={data?.products} />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CategoryPage;
