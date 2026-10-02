"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import qs from "query-string";
import { Button } from "@/components/ui/button";
import SortIcon from "/public/images/sort-icon.svg";
import { cn } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

const SortProducts = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [selectSort, setSelectSort] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("filters");

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsideSort);

    return () => {
      window.removeEventListener("mousedown", clickOutsideSort);
    };
  }, []);

  useEffect(() => {
    const sortByPrice = qs.parse(window.location.search).sortByPrice;
    if (typeof sortByPrice === "string") setSelectSort(sortByPrice);
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
          <DrawerTrigger asChild>
            <Button
              aria-label={t("sortAriaLabel")}
              variant="ghost"
              className="p-0 flex items-center gap-2"
            >
              <SortIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-[#FFFDFD] h-1/2 container">
            <div className="flex items-start px-6 gap-6 justify-center flex-col h-full">
              <DialogHeader>
                <DialogTitle>{t("sorting")}:</DialogTitle>
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
                    {t("priceAsc")}
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="desc" id="desc" />
                  <Label htmlFor="desc" className="text-base">
                    {t("priceDesc")}
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

          {selectSort === "asc"
            ? t("priceAsc")
            : selectSort === "desc"
              ? t("priceDesc")
              : t("sorting")}
        </Button>

        <div
          className={cn(
            "rounded-lg bg-[#FFFDFD] shadow-md p-4 z-[12] max-h-44 overflow-y-auto flex flex-col gap-4 transform transition-all origin-top duration-300 absolute top-[105%] scale-y-0 border border-solid max-w-max right-0",
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
            {t("priceAsc")}
          </Button>
          <Button
            onClick={() => onValueChange("desc")}
            variant="ghost"
            className="flex items-start ml-0 p-0 h-auto max-w-max"
          >
            {t("priceDesc")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SortProducts;
