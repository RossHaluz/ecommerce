"use client";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import qs from "query-string";
import { Button } from "@/components/ui/button";
import SortIcon from "/public/images/sort-icon.svg";
import { cn } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SortProductsProps {
  searchParams: {
    page?: string;
    searchValue?: string;
    sortByPrice?: string;
    modelId?: string;
  };
}

const SortProducts: FC<SortProductsProps> = ({ searchParams }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [selectSort, setSelectSort] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsideSort);

    return () => {
      window.removeEventListener("mousedown", clickOutsideSort);
    };
  }, []);

  useEffect(() => {
    const queryParams = qs.parse(window.location.search);
    const sortByPrice = queryParams.sortByPrice as string;
    if (sortByPrice) {
      localStorage.setItem("sortByPrice", sortByPrice);
      const sort = localStorage.getItem("sortByPrice");
      if (sort) {
        setSelectSort(sort);
      }
    } else {
      localStorage.setItem("sortByPrice", "");
    }
  }, []);

  const clickOutsideSort = (e: MouseEvent) => {
    if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const onValueChange = (value: string) => {
    const queryParams = qs.parse(window.location.search);
    const searchValue = queryParams?.searchValue;
    const modelId = queryParams?.modelId;
    const stockStatus = queryParams.stockStatus;

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          sortByPrice: value ? value : null,
          searchValue: searchValue ? searchValue : null,
          stockStatus: stockStatus ? stockStatus : null,
          modelId: modelId ? modelId : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    setSelectSort(value);
    setIsOpen(false);
    return router.push(url, { scroll: false });
  };

  return (
    <>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger>
            <Button
              aria-label="Сортування товарів"
              variant="ghost"
              className="p-0 flex items-center gap-2"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <SortIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-[#FFFDFD] h-1/2 container">
            <div className="flex items-start px-6 gap-6 justify-center flex-col h-full">
              <DialogHeader>
                <DialogTitle>Сортування:</DialogTitle>
              </DialogHeader>
              <RadioGroup
                defaultValue="asc"
                value={selectSort}
                onValueChange={(value) => onValueChange(value)}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="asc" id="asc" />
                  <Label htmlFor="asc" className="text-base">
                    Від дешевшого до дорожчого
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="desc" id="desc" />
                  <Label htmlFor="desc" className="text-base">
                    Від дорожчого до дешевшого
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="relative max-w-max ml-auto hidden md:block" ref={sortRef}>
        <Button
          aria-label="Сортування товарів за зростанням або спаданням"
          variant="ghost"
          className="p-0 flex items-center gap-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <SortIcon />

          {selectSort
            ? (selectSort === "asc" && "Від дешевшого до дорожчого") ||
              (selectSort === "desc" && "Від дорожчого до дешевшого")
            : "Сортування"}
        </Button>

        <div
          className={cn(
            "rounded-lg bg-[#FFFDFD] shadow-md p-4 z-20 max-h-44 overflow-y-auto flex flex-col gap-4 transform transition-all origin-top duration-300 absolute top-[105%] scale-y-0 border border-solid max-w-max right-0",
            {
              "scale-y-1": isOpen,
            }
          )}
        >
          <Button
            aria-label="Сортування від дешевшого"
            onClick={() => onValueChange("asc")}
            variant="ghost"
            className="flex items-start ml-0 p-0 h-auto max-w-max"
          >
            Від дешевшого до дорожчого
          </Button>
          <Button
            aria-label="Сортування від дорожчого"
            onClick={() => onValueChange("desc")}
            variant="ghost"
            className="flex items-start ml-0 p-0 h-auto max-w-max"
          >
            Від дорожчого до дешевшого
          </Button>
        </div>
      </div>
    </>
  );
};

export default SortProducts;
