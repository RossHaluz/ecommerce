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
import { useSelector } from "react-redux";
import { selectCurrentModel } from "@/redux/models/selectors";

interface SortProductsProps {
  searchParams: {
    filterIds?: string;
    page?: string;
    searchValue?: string;
    sortByPrice?: string;
    modelId?: string;
  };
}

const SortProducts: FC<SortProductsProps> = ({ searchParams }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { filterIds, searchValue } = searchParams;
  const [selectSort, setSelectSort] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const currentModel = useSelector(selectCurrentModel);

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsideSort);

    return () => {
      window.removeEventListener("mousedown", clickOutsideSort);
    };
  }, []);

  useEffect(() => {
    const sort = localStorage.getItem("sortByPrice");
    if (sort) {
      setSelectSort(sort);
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    const currentPage = localStorage.getItem("currentPage");

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          filterIds: filterIds ? filterIds : null,
          sortByPrice: selectSort ? selectSort : null,
          searchValue: searchValue ? searchValue : null,
          page: currentPage ? currentPage : null,
          modelId: currentModel ? currentModel?.id : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url, { scroll: false });
    localStorage.setItem("sortByPrice", selectSort);
  }, [
    selectSort,
    isInitialized,
    pathname,
    router,
    currentModel,
    filterIds,
    searchValue,
  ]);

  const clickOutsideSort = (e: MouseEvent) => {
    if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const onValueChange = (value: string) => {
    setSelectSort(value);
    setIsOpen(false);
  };

  return (
    <>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger>
            <Button
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
            onClick={() => onValueChange("asc")}
            variant="ghost"
            className="flex items-start ml-0 p-0 h-auto max-w-max"
          >
            Від дешевшого до дорожчого
          </Button>
          <Button
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

// <Select onValueChange={onValueChange} value={selectSort}>
//   <SelectTrigger className="w-full lg:w-[195px] bg-[#F2F2F2]">
//     <SelectValue placeholder="Сортування" />
//   </SelectTrigger>
//   <SelectContent className="bg-[#F2F2F2]">
//     {/* <SelectItem value="light">За популярністю</SelectItem> */}
//     <SelectItem value="asc">Від дешевших</SelectItem>
//     <SelectItem value="desc">Від дорожчих</SelectItem>
//   </SelectContent>
// </Select>
