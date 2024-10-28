import Section from "@/components/section";
import axios from "axios";
import { FC } from "react";
import MobileFilters from "../categories/[categoryId]/_components/mobile-filters";
import Filters from "../categories/[categoryId]/_components/filters";
import SortProducts from "../categories/[categoryId]/_components/sort";
import Products from "./_components/products";
import { cookies } from "next/headers";

interface SearchPageProps {
  searchParams: {
    filterIds: string;
    maxPrice: string;
    minPrice: string;
    page: string;
    sortByPrice: string;
    searchValue: string;
  };
}

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const searcValue = cookies().get("__search_value")?.value;

  
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/products`,
    {
      params: {
        searchValue: searcValue,
        filterIds: searchParams.filterIds,
        maxPrice: searchParams.maxPrice,
        minPrice: searchParams.minPrice,
        page: searchParams.page,
        sortByPrice: searchParams.sortByPrice,
      },
    }
  );

  return (
    <Section title={`Результати пошуку: ${searcValue ? searcValue : ""}`}>
      <div className="pt-[10px] pb-[30px] flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-[15px] lg:hidden">
          <MobileFilters filters={data.filters} searchParams={searchParams} />
          <SortProducts searchParams={searchParams} />
        </div>
        <div className="flex items-start gap-10">
          <Filters filters={data.filters} searchParams={searchParams} />

          <div className="w-full flex flex-col gap-6">
            <div className="w-full hidden lg:flex items-center justify-between">
              <div className="flex items-center gap-10">
                <span className="text-[#484848] text-base">Сортування:</span>
                <SortProducts searchParams={searchParams} />
              </div>

              <h3 className="text-[#484848] text-base font-medium">{`Знайдено: ${
                data?.products?.length
              } ${data?.products?.length > 1 ? "товарів" : "товар"}`}</h3>
            </div>

            <Products
              products={data?.products}
              page={data?.meta?.page}
              totalPages={data?.meta?.totalPages}
              searchParams={searchParams}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SearchPage;
