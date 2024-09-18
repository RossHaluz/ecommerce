import Section from '@/components/section'
import axios from 'axios'
import { cookies } from 'next/headers'; 
import MobileFilters from './_components/mobile-filters';
import SortProducts from './_components/sort';
import Filters from './_components/filters';
import { FC } from 'react';
import Products from './_components/products';

interface SearchPageProps {
  searchParams: {
    filterIds: string;
    maxPrice: string;
    minPrice: string;
    page: string;
    sortByPrice: string;
  };
}

const SearchPage: FC<SearchPageProps> = async ({searchParams}) => {
const cokieStore = cookies();
const searchValue = cokieStore.get('searchValue')?.value;

    const { data } = await axios.get(
        `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/products?searchValue=${searchValue}`
      );

      
  return (
    <Section title={`Результати пошуку: ${searchValue}`}>
   <div className="pt-[10px] pb-[30px] flex flex-col gap-5">
        {/* <div className="grid grid-cols-2 gap-[15px] lg:hidden">
          <MobileFilters filters={filters} searchParams={searchParams}/>
          <SortProducts searchParams={searchParams}/>
        </div> */}
        <div className="flex items-start gap-10">
          {/* <Filters
            filters={filters}
            rangePrice={{
              minPrice: data?.category?.minPrice,
              maxPrice: data?.category?.maxPrice,
            }}
            searchParams={searchParams}
          /> */}

          <div className="w-full flex flex-col gap-6">
            <div className="w-full hidden lg:flex items-center justify-between">
              {/* <div className="flex items-center gap-10">
                <span className="text-[#484848] text-base">Сортування:</span>
                <SortProducts searchParams={searchParams}/>
              </div> */}

              <h3 className="text-[#484848] text-base font-medium">{`Знайдено: ${
                data?.category?.products?.length
              } ${data?.category?.products?.length > 1 ? "товарів" : "товар"}`}</h3>
            </div>

            <Products products={data?.products} page={data?.meta?.page}  totalPages={data?.meta?.totalPages} categortId={data?.category?.id} searchParams={searchParams} />
          </div>
        </div>
      </div>
    </Section>
  )
}

export default SearchPage
