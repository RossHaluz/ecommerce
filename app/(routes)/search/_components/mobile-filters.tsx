import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Filter from "/public/images/filter.svg";
import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

interface MobileFiltersProps {
  filters: {
    name: string;
    id: string;
    filterOptions: {
      name: string;
      id: string;
    }[];
  }[];
}

const MobileFilters: FC<MobileFiltersProps> = ({ filters }) => {
  return (
    <Sheet>
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
          <Accordion type="multiple" className="w-full mt-7 overflow-y-auto">
            {filters?.map((item) => {
              return (
                <AccordionItem key={item?.id} value={item?.id}>
                  <AccordionTrigger className="text-base text-[#484848]">
                    {item?.name}
                  </AccordionTrigger>
                  <AccordionContent
                    key={item?.id}
                    className="p-[15px] bg-[#EAF2EB] flex flex-col gap-[15px] rounded-md"
                  >
                    {item?.filterOptions?.map((item) => {
                      return (
                        <div className="flex items-center space-x-2" key={item?.id}>
                          <Checkbox id={item?.id} />
                          <label
                            htmlFor={item?.id}
                            className="text-sm text-[#484848]"
                          >
                            {item?.name}
                          </label>
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <Button className="mt-auto">Фільтр</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilters;
