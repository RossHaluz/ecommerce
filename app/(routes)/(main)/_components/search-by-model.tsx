"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import qs from "query-string";
import { usePathname, useRouter } from "next/navigation";

interface SearchByModelProps {
  models: {
    id: string;
    name: string;
  }[];
}

const SearchByModel: FC<SearchByModelProps> = ({ models }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectModel, setSelectModel] = useState<null | {
    id: string;
    name: string;
  }>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const model = localStorage.getItem("model");
    if (model) {
      const parseModels = JSON.parse(model);
      setSelectModel(parseModels);
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    const selectSort = localStorage.getItem("sortByPrice");
    const currentPage = localStorage.getItem("currentPage");

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          modelId: selectModel?.id,
          sortByPrice: selectSort ? selectSort : null,
          page: currentPage ? currentPage : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    return router.push(url, { scroll: false });
  }, [isInitialized]);

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsideModel);

    return () => {
      window.removeEventListener("mousedown", clickOutsideModel);
    };
  }, []);

  const clickOutsideModel = (e: MouseEvent) => {
    if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleRemoveModel = () => {
    localStorage.removeItem("model");
    const selectSort = localStorage.getItem("sortByPrice");
    setSelectModel(null);
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          modelId: null,
          sortByPrice: selectSort ? selectSort : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    return router.push(url);
  };

  const handleSelectModel = (model: { id: string; name: string }) => {
    setSelectModel({
      id: model?.id,
      name: model?.name,
    });
    setIsOpen(false);
  };

  const handleSerchProductsByModel = () => {
    if (!selectModel) return;
    localStorage.setItem("model", JSON.stringify(selectModel));
    const selectSort = localStorage.getItem("sortByPrice");

    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        modelId: selectModel?.id,
        ...(selectSort && { sortByPrice: selectSort }),
      },
    });

    return router.push(url);
  };

  return (
    <div className="p-4 md:p-6 rounded-lg bg-[#FFFDFD] flex flex-col gap-3 md:gap-6">
      <h3 className="text-[#111111] text-[16px] leading-[19.5px] md:text-[24px] md:leading-[33.6px] font-medium">
        Пошук автозапчастим по моделях:
      </h3>
      <div className="flex items-center gap-4">
        <div className="relative w-full md:w-[342px]" ref={modelRef}>
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
            className={cn(
              "bg-[#F2F2F2] p-5 rounded-lg w-full flex items-center gap-2 justify-between hover:bg-[#F2F2F2] hover:text-current",
              {
                "text-[#111111]": selectModel,
              }
            )}
          >
            {selectModel ? (
              selectModel?.name
            ) : (
              <span className="text-[#B8B6B6]">Оберіть модель</span>
            )}
            <div className="flex items-center gap-1">
              {selectModel && (
                <X color="#c0092a" size={24} onClick={handleRemoveModel} />
              )}
              <ChevronDown
                color="#111111"
                size={24}
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
              "rounded-lg bg-[#FFFDFD] shadow-md p-4 z-20 max-h-44 overflow-y-auto flex flex-col transform transition-all origin-top duration-300 absolute top-[105%] scale-y-0 border border-solid w-full right-0",
              {
                "scale-y-1": isOpen,
              }
            )}
          >
            {models?.map((item) => {
              return (
                <Button
                  onClick={() => handleSelectModel(item)}
                  variant="ghost"
                  key={item?.id}
                  className={cn("flex items-start ml-0", {
                    "text-[#c0092a] font-medium": selectModel?.id === item?.id,
                  })}
                >
                  {item?.name}
                </Button>
              );
            })}
          </div>
        </div>
        <Button
          type="button"
          onClick={handleSerchProductsByModel}
          className="w-full p-[11.5px] md:max-w-max md:px-[90.5px] md:py-[14px] flex items-center justify-center"
        >
          Шукати
        </Button>
      </div>
    </div>
  );
};

export default SearchByModel;
