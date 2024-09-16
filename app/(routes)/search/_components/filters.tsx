"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React, { FC, useEffect, useState } from "react";
import qs from "query-string";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Slider from "rc-slider";
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
  rangePrice: {
    minPrice: number;
    maxPrice: number;
  };
}

const Filters: FC<FiltersProps> = ({ filters, rangePrice }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [filterIds, setFilterIds] = useState<FilterOption[]>([]);
  const [rangePrices, setRangePrices] = useState<number[]>([
    rangePrice.minPrice,
    rangePrice.maxPrice,
  ]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPriceChangedByUser, setIsPriceChangedByUser] = useState(false);
  const [isChangeRange, setIsChaneRange] = useState(false);

  useEffect(() => {
    const storedFilterIds = localStorage.getItem("filterIds");
    const storedRangePrices = localStorage.getItem("rangePrices");

    if (storedFilterIds) {
      setFilterIds(JSON.parse(storedFilterIds));
    }
    if (storedRangePrices) {
      setRangePrices(JSON.parse(storedRangePrices));
    } else {
      setRangePrices([rangePrice.minPrice, rangePrice.maxPrice]);
    }
    setIsInitialized(true);
  }, []);

  // useEffect(() => {
  //   if (!isPriceChangedByUser) {
  //     setRangePrices([rangePrice.minPrice, rangePrice.maxPrice]);
  //   }
  // }, [rangePrice]);

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
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
    localStorage.setItem("filterIds", JSON.stringify(filterIds));
    localStorage.setItem("rangePrices", JSON.stringify(rangePrices));
  }, [filterIds, rangePrices, pathname, router, isInitialized]);

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

  // const handlePriceChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   type: "min" | "max"
  // ) => {
  //   const value = Number(e.target.value);
  //   setIsPriceChangedByUser(true);
  //   setRangePrices((prev) => {
  //     const newRange = [...prev];
  //     newRange[type === "min" ? 0 : 1] = value;
  //     return newRange;
  //   });
  // };

  const removeFilterIds = () => {
    localStorage.removeItem("filterIds");
    localStorage.removeItem("rangePrices");
    setFilterIds([]);
    setRangePrices([rangePrice.minPrice, rangePrice.maxPrice]);
  };

  // const handleRangeChange = (value: number | number[]) => {
  //   setIsPriceChangedByUser(true);
  //   if (Array.isArray(value) && value.length === 2) {
  //     setRangePrices(value);

  //     const url = qs.stringifyUrl(
  //       {
  //         url: pathname,
  //         query: {
  //           minPrice: value[0] ? value[0].toString() : null,
  //           maxPrice: value[1] ? value[1].toString() : null,
  //         },
  //       },
  //       { skipEmptyString: true, skipNull: true }
  //     );

  //     router.push(url);
  //   }
  // };

  return (
    <div className="hidden lg:flex flex-col gap-[30px] w-[235px]">
      {filterIds?.length > 0 && (
        <div className="flex flex-col gap-[15px]">
          <span className="text-[#484848] text-base font-bold">Ви обрали:</span>
          <div className="flex flex-col gap-[10px]">
            {/* <div className="py-[7px] px-[15px] w-full bg-[#EAF2EB]">
            Ціна: від {rangePrices[0]} ₴ до {rangePrices[1]}
          </div> */}

            {filterIds?.map((item) => (
              <div
                className="py-[7px] px-[15px] w-full bg-[#EAF2EB]"
                key={item?.id}
              >
                {item?.filter?.name}: {item?.name}
              </div>
            ))}
            <Button
              variant="ghost"
              className="underline text-[#78AB7E] text-base font-bold flex justify-start p-0 items-start"
              onClick={removeFilterIds}
            >
              Очистити фільтр
            </Button>
          </div>
        </div>
      )}

      {/* <div
        className={`p-[15px] bg-[#EAF2EB] flex flex-col gap-[15px] rounded-md `}
      >
        <h3 className="text-lg font-bold text-[rgb(72,72,72)]">Ціна</h3>
        <div className="flex flex-col gap-6 pb-[15px]">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Мін"
              value={rangePrices[0]}
              onChange={(e) => handlePriceChange(e, "min")}
              className="p-2 rounded border border-gray-300"
            />
            -
            <Input
              type="number"
              placeholder="Макс"
              value={rangePrices[1]}
              onChange={(e) => handlePriceChange(e, "max")}
              className="p-2 rounded border border-gray-300"
            />
          </div>
          <div className="px-[15px]">
            <Slider
              range
              className="t-slider"
              min={rangePrice?.minPrice}
              max={rangePrice?.maxPrice}
              step={10}
              value={rangePrices}
              onChange={handleRangeChange}
            />
          </div>
        </div>
      </div> */}

      {filters?.map((filter) => {
        return (
          <div
            key={filter.id}
            className="p-[15px] w-[235px] bg-[#EAF2EB] flex flex-col gap-[15px] rounded-md"
          >
            <h3 className="text-lg font-bold text-[#484848]">{filter.name}</h3>

            {filter.filterOptions?.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                {filter?.type === "checkbox" ? (
                  <>
                    <Checkbox
                      checked={filterIds.some((f) => f.id === item.id)}
                      onCheckedChange={() => handleCheckedChange(item, 'checkbox')}
                    />
                    <label htmlFor={item.id} className="text-sm text-[#484848]">
                      {item.name}
                    </label>
                  </>
                ) : (
                  filter?.type === "radio" && <RadioGroup 
                  value={filterIds.find((f) => f.filter.id === filter.id)?.id || ""}
                  onValueChange={() => handleCheckedChange(item, "radio")}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={item?.id} id={item?.id}/>
                    <Label htmlFor={item.id} className="text-sm text-[#484848]">   {item.name}</Label>
                  </div>
                </RadioGroup>
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
