import Section from "@/components/section";
import { FC } from "react";
import MobileFilters from "../categories/[categoryId]/_components/mobile-filters";
import Filters from "../categories/[categoryId]/_components/filters";
import SortProducts from "../categories/[categoryId]/_components/sort";
import Products from "./_components/products";
import { cookies } from "next/headers";
import NotFoundItems from "@/components/not-found-items";
import { getSearchProducts } from "@/actions/get-data";

interface SearchPageProps {
  searchParams: {
    filterIds: string;
    page: string;
    sortByPrice: string;
    searchValue: string;
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
    <Section title={`Результати пошуку: ${searchValue ? searchValue : ""}`}>
      {data?.products?.length > 0 ? (
        <div className="pt-[10px] pb-[30px] flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-[15px] lg:hidden">
            <MobileFilters filters={data.filters} searchParams={searchParams} />
            <SortProducts searchParams={searchParams} />
          </div>
          <div className="flex items-start gap-10">
            {data.filters?.length > 0 && (
              <Filters filters={data.filters} searchParams={searchParams} />
            )}

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
      ) : (
        <NotFoundItems text="Немає товарів, що відповідають критеріям пошуку." />
      )}
    </Section>
  );
};

export default SearchPage;
