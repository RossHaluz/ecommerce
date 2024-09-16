'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import qs from 'query-string';

interface SortProductsProps {
  searchParams: {
    filterIds: string;
    maxPrice: string;
    minPrice: string;
    page: string;
  };
}

const SortProducts: FC<SortProductsProps> = ({searchParams}) => {
  const pathname = usePathname();
  const router = useRouter();
  const {filterIds, maxPrice, minPrice, page} = searchParams;

  const onValueChange = (value: string) => { 
    const url = qs.stringifyUrl({
      url: pathname, 
      query: {
        filterIds: filterIds ? filterIds : null,
        maxPrice: maxPrice ? maxPrice : null,
        minPrice: minPrice ? minPrice : null,
        page: page ? page : "",
        sortByPrice: value ? value : null
      }
    }, { skipEmptyString: true, skipNull: true })

    router.push(url);
  }

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-full lg:w-[195px] bg-[#EAF2EB]">
        <SelectValue placeholder="Сортування" />
      </SelectTrigger>
      <SelectContent className="bg-[#EAF2EB]">
        {/* <SelectItem value="light">За популярністю</SelectItem> */}
        <SelectItem value="asc">Від дешевших</SelectItem>
        <SelectItem value="desc">Від дорожчих</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortProducts;
