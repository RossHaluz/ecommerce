"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { resetItems } from "@/redux/items/slice";
import { ChevronDown, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import queryString from "query-string";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const stocks = [
  {
    id: 1,
    name: "Всі товари",
    value: "all",
  },
  {
    id: 2,
    name: "В наявності",
    value: "in_stock",
  },
  {
    id: 3,
    name: "Під замовлення",
    value: "pre_order",
  },
];

const SearchByStock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectStock, setSelectStock] = useState<{
    id: number;
    name: string;
    value: string;
  } | null>(null);
  const stockRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = queryString.parse(window.location.search);
    const stockStatus = queryParams.stockStatus as string;
    if (stockStatus) {
      window.localStorage.setItem("stockStatus", stockStatus);
      const stock = window.localStorage.getItem("stockStatus");
      const findStock = stocks.find((item) => item.value === stock);
      if (findStock) {
        setSelectStock(findStock);
      }
    } else {
      window.localStorage.setItem("stockStatus", "");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", clickOutside);

    return () => {
      window.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  const clickOutside = (e: MouseEvent) => {
    if (stockRef.current && !stockRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleRemoveStock = () => {
    dispatch(resetItems());
    const queryParams = queryString.parse(window.location.search);
    const sortByPrice = queryParams?.sortByPrice as string;
    const modelId = queryParams?.modelId as string;
    const searchValue = queryParams?.searchValue as string;

    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: {
          sortByPrice: sortByPrice ? sortByPrice : null,
          modelId: modelId ? modelId : null,
          searchValue: searchValue ? searchValue : null,
          page: 1,
          stockStatus: null,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    setSelectStock(null);
    setIsOpen(false);
    return router.push(url, { scroll: false });
  };

  const handleSelectStock = (
    stock: {
      id: number;
      name: string;
      value: string;
    } | null
  ) => {
    if (!stock) return;
        dispatch(resetItems());
    const queryParams = queryString.parse(window.location.search);
    const searchValue = queryParams.searchValue;
    const sortByPrice = queryParams?.sortByPrice as string;
    const modelId = queryParams.modelId;
    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: {
          searchValue: searchValue ? searchValue : null,
          sortByPrice: sortByPrice ? sortByPrice : null,
          modelId: modelId ? modelId : null,
          stockStatus: stock.value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    setSelectStock(stock);
    setIsOpen(false);
    return router.push(url, { scroll: false });
  };

  return (
    <div className="rounded-lg flex flex-col gap-3 md:gap-6 w-full">
      <div className="flex items-center gap-4">
        <div className="relative w-full md:max-w-max" ref={stockRef}>
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
            className={cn(
              "bg-[#FFFDFD] border border-solid text-[#111111] border-[#111] p-3 md:p-5 rounded-lg w-full flex items-center gap-2 justify-between hover:bg-[#FFFDFD] hover:text-current text-base",
              {
                "text-[#111111]": selectStock,
              }
            )}
          >
            <span className="text-[#111] font-bold text-base truncate">
              {selectStock ? selectStock?.name : "Наявність"}
            </span>
            <div className="flex items-center gap-1">
              {selectStock && <X color="#c0092a" onClick={handleRemoveStock} />}
              <ChevronDown
                color="#111111"
                className={cn(
                  "transform transition-all duration-300 rotate-0",
                  {
                    "rotate-180": isOpen,
                  }
                )}
              />
            </div>
          </Button>
          <div
            className={cn(
              "rounded-lg bg-[#FFFDFD] shadow-md p-3 z-30 flex flex-col transform transition-all origin-top duration-300 absolute top-[105%] scale-y-0 border border-solid w-full right-0",
              {
                "scale-y-1": isOpen,
              }
            )}
          >
            {stocks?.map((item) => {
              return (
                <Button
                  type="button"
                  variant="ghost"
                  size="reset"
                  key={item.id}
                  onClick={() => handleSelectStock(item)}
                  className="text-left py-1"
                >
                  {item.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchByStock;
