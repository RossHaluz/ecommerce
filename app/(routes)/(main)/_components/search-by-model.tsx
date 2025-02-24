"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn, sortCarModels } from "@/lib/utils";
import qs from "query-string";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
import { setSelectModel, removeSelectedModel } from "@/redux/models/slice";
import { useSelector } from "react-redux";
import { selectCurrentModel } from "@/redux/models/selectors";
import { Button } from "@/components/ui/button";

interface SearchByModelProps {
  models: {
    id: string;
    name: string;
  }[];
}

const SearchByModel: FC<SearchByModelProps> = ({ models }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const currentModel = useSelector(selectCurrentModel);
  const [isInitialization, setIsInitialization] = useState(false);

  useEffect(() => {
    setIsInitialization(true);
    router.refresh();
  }, []);

  useEffect(() => {
    if (!isInitialization) return;
    const queryParams = qs.parse(window.location.search);

    const modelId = queryParams?.modelId as string;

    if (modelId) {
      const selectedModel = models?.find((model) => modelId === model?.id);
      if (selectedModel) {
        dispatch(setSelectModel(selectedModel));
      }
    } else {
      dispatch(removeSelectedModel());
    }
  }, [pathname, models]);

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsideModel);

    return () => {
      window.removeEventListener("mousedown", clickOutsideModel);
    };
  }, []);

  sortCarModels(models);

  const clickOutsideModel = (e: MouseEvent) => {
    if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleRemoveModel = () => {
    dispatch(removeSelectedModel());
    const queryParams = qs.parse(window.location.search);
    const selectSort = queryParams?.sortByPrice;
    const searchValue = queryParams?.searchValue;

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          modelId: null,
          sortByPrice: selectSort ? selectSort : null,
          searchValue: searchValue ? searchValue : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    return router.push(url);
  };

  const handleSerchProductsByModel = (model: { id: string; name: string }) => {
    if (!model) return;
    dispatch(setSelectModel(model));
    const queryParams = qs.parse(window.location.search);
    const searchValue = queryParams?.searchValue;
    const sortByPrice = queryParams?.sortByPrice;

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          modelId: model ? model?.id : null,
          sortByPrice: sortByPrice ? sortByPrice : null,
          searchValue: searchValue ? searchValue : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    setIsOpen(false);

    return router.replace(url);
  };

  return (
    <div className="rounded-lg flex flex-col gap-3 md:gap-6">
      <div className="flex items-center gap-4">
        <div className="relative w-full md:w-[342px]" ref={modelRef}>
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
            className={cn(
              "bg-[#FFFDFD] border border-solid border-[#111] p-5 rounded-lg w-full flex items-center gap-2 justify-between hover:bg-[#FFFDFD] hover:text-current text-base",
              {
                "text-[#111111]": currentModel,
              }
            )}
          >
            {currentModel ? (
              currentModel?.name
            ) : (
              <span className="text-[#111111] font-bold text-base">
                Оберіть модель
              </span>
            )}
            <div className="flex items-center gap-1">
              {currentModel && (
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
            {sortCarModels(models)?.map((item) => {
              return (
                <Button
                  onClick={() => handleSerchProductsByModel(item)}
                  variant="ghost"
                  key={item?.id}
                  className={cn("flex items-start ml-0", {
                    "text-[#c0092a] font-medium": currentModel?.id === item?.id,
                  })}
                >
                  {item?.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchByModel;
