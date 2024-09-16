"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import qs from "query-string";

interface SortProductsProps {
  searchParams: {
    filterIds: string;
    maxPrice: string;
    minPrice: string;
    page: string;
  };
}

const SortProducts: FC<SortProductsProps> = ({ searchParams }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { filterIds, maxPrice, minPrice, page } = searchParams;
  const [selectSort, setSelectSort] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const sort = localStorage.getItem("sortByPrice");
    if (sort) {
      setSelectSort(sort);
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          filterIds: filterIds ? filterIds : null,
          sortByPrice: selectSort ? selectSort : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
    localStorage.setItem("sortByPrice", selectSort);
  }, [selectSort, isInitialized, pathname, router]);

  const onValueChange = (value: string) => {
    setSelectSort(value);
  };

  return (
    <Select onValueChange={onValueChange} value={selectSort}>
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
