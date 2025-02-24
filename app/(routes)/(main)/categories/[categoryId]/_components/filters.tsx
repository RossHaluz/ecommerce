"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React, { FC, useEffect, useState } from "react";
import qs from "query-string";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import "rc-slider/assets/index.css";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface FilterOption {
  id: string;
  name: string;
  filter: {
    name: string;
    id: string;
  };
}

interface FiltersProps {
  filters: {
    name: string;
    id: string;
    type: string;
    filterOptions: FilterOption[];
  }[];
  searchParams: {
    filterIds: string;
    searchValue: string;
    page: string;
    sortByPrice: string;
  };
}

const Filters: FC<FiltersProps> = ({ filters, searchParams }) => {
  const { sortByPrice, searchValue } = searchParams;
  const pathname = usePathname();
  const router = useRouter();
  const [filterIds, setFilterIds] = useState<FilterOption[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);


  useEffect(() => {
    const storedFilterIds = localStorage.getItem("filterIds");

    if (storedFilterIds) {
      setFilterIds(JSON.parse(storedFilterIds));
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          filterIds:
            filterIds.length > 0
              ? filterIds.map((filter) => filter.id).join(",")
              : null,
          sortByPrice: sortByPrice ? sortByPrice : null,
          searchValue: searchValue ? searchValue : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
    localStorage.setItem("filterIds", JSON.stringify(filterIds));
  }, [filterIds, pathname, router, isInitialized, searchValue, sortByPrice]);

  const handleCheckedChange = (filter: FilterOption, type: string) => {
    if (type === "checkbox") {
      setFilterIds((prevFilter) => {
        if (prevFilter.find((item) => item.id === filter.id)) {
          return prevFilter.filter((item) => item.id !== filter.id);
        } else {
          return [...prevFilter, filter];
        }
      });
    } else if (type === "radio") {
      setFilterIds((prevFilter) => {
        const updatedFilters = prevFilter.filter(
          (item) => item.filter.id !== filter.filter.id
        );
        return [...updatedFilters, filter];
      });
    }
  };

  const removeFilterIds = () => {
    localStorage.removeItem("filterIds");
    setFilterIds([]);

    router.refresh();
  };

  return (
    <div className="hidden lg:flex flex-col gap-[30px] w-[235px]">
      {filterIds?.length > 0 && (
        <div className="flex flex-col gap-[15px]">
          <span className="text-[#484848] text-base font-bold">Ви обрали:</span>
          <div className="flex flex-col gap-[10px]">
            {filterIds?.map((item) => (
              <div
                className="py-[7px] px-[15px] w-full bg-[#F2F2F2]"
                key={item?.id}
              >
                {item?.filter?.name}: {item?.name}
              </div>
            ))}
            <Button
              variant="ghost"
              className="underline text-[#c0092a] text-base font-bold flex justify-start p-0 items-start"
              onClick={removeFilterIds}
            >
              Очистити фільтр
            </Button>
          </div>
        </div>
      )}

      {filters?.map((filter) => {
        return (
          <div
            key={filter.id}
            className="p-[15px] w-[235px] bg-[#F2F2F2] flex flex-col gap-[15px] rounded-md"
          >
            <h3 className="text-lg font-bold text-[#484848]">{filter.name}</h3>

            {filter.filterOptions?.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                {filter?.type === "checkbox" ? (
                  <>
                    <Checkbox
                      checked={filterIds.some((f) => f.id === item.id)}
                      onCheckedChange={() =>
                        handleCheckedChange(item, "checkbox")
                      }
                    />
                    <label htmlFor={item.id} className="text-sm text-[#484848]">
                      {item.name}
                    </label>
                  </>
                ) : (
                  filter?.type === "radio" && (
                    <RadioGroup
                      value={
                        filterIds.find((f) => f.filter.id === filter.id)?.id ||
                        ""
                      }
                      onValueChange={() => handleCheckedChange(item, "radio")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={item?.id} id={item?.id} />
                        <Label
                          htmlFor={item.id}
                          className="text-sm text-[#484848]"
                        >
                          {" "}
                          {item.name}
                        </Label>
                      </div>
                    </RadioGroup>
                  )
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
