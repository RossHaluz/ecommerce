'use client'
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Filter from "/public/images/filter.svg";
import { FC, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter } from "next/navigation";
import qs from 'query-string';
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


interface MobileFiltersProps {
  filters: {
    name: string;
    id: string;
    type: string;
    filterOptions: FilterOption[];
  }[];
  searchParams: {
    filterIds: string;
    page: string;
    sortByPrice: string;
  };
}

const MobileFilters: FC<MobileFiltersProps> = ({ filters, searchParams }) => {
  const {sortByPrice} = searchParams;
  const pathname = usePathname();
  const router = useRouter();
  const [filterIds, setFilterIds] = useState<FilterOption[]>([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false)

  useEffect(() => {
    const storedFilterIds = localStorage.getItem("filterIds");

    if (storedFilterIds) {
      setFilterIds(JSON.parse(storedFilterIds));
    }
  }, []);



  const handleFilterItems = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          filterIds:
            filterIds.length > 0
              ? filterIds.map((filter) => filter.id).join(",")
              : null,
          sortByPrice: sortByPrice || null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );


    localStorage.setItem("filterIds", JSON.stringify(filterIds));
    router.push(url);
    router.refresh();
  };


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

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          filterIds: null,
          sortByPrice: sortByPrice || null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
    router.refresh();
  };


  return (
    <Sheet onOpenChange={() => setIsOpenFilter(prev => !prev)} open={isOpenFilter}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="bg-[#EAF2EB] flex items-center gap-[15px] text-[#484848] text-sm"
        >
          <Filter />
          Фільтр
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col h-full">
          <h3 className="flex items-center gap-[13px] text-[#484848] text-base font-semibold">
            <Filter />
            Фільтер товарів
          </h3>
          <div className="flex flex-col justify-between h-full">
          <Accordion type="multiple" className="w-full mt-7 overflow-y-auto">
            {filters?.map((filter) => {
              return (
                <AccordionItem key={filter?.id} value={filter?.id}>
                  <AccordionTrigger className="text-base text-[#484848]">
                    {filter?.name}
                  </AccordionTrigger>
                  <AccordionContent
                    key={filter?.id}
                    className="p-[15px] bg-[#EAF2EB] flex flex-col gap-[15px] rounded-md"
                  >
                    {filter?.filterOptions?.map((item) => (
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
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

<div className="flex flex-col gap-2 justify-end">

          <Button
              variant='ghost'
              className="underline text-base font-medium text-[#484848]"
              onClick={removeFilterIds}
              disabled={filterIds?.length === 0}
            >
              Очистити фільтр
            </Button>
          <Button  onClick={handleFilterItems} type="button" disabled={filterIds?.length === 0}>Фільтр</Button>
          </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilters;
