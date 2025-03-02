"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn, sortCarModels } from "@/lib/utils";
import qs from "query-string";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FixedSizeList as List } from "react-window";

interface SearchByModelProps {
  models: {
    id: string;
    name: string;
    modelName: string;
  }[];
}

const SearchByModel: FC<SearchByModelProps> = ({ models }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState<{
    id: string;
    name: string;
    modelName: string;
  } | null>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    if (!params?.modelName) {
      setCurrentModel(null);
    } else {
      const model = models.find((item) => item.modelName === params.modelName);
      if (model) setCurrentModel(model);
    }
  }, [params?.modelName, models]);

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
    setCurrentModel(null);
    const queryParams = qs.parse(window.location.search);
    const selectSort = queryParams?.sortByPrice;
    const searchValue = queryParams?.searchValue;

    const newPathArray = pathname
      .split("/")
      .filter((item) => item !== params?.modelName && item !== "");

    // Правильне формування шляху
    const newPath =
      newPathArray.length > 0 ? `/${newPathArray.join("/")}` : "/";

    const url = qs.stringifyUrl(
      {
        url: newPath,
        query: {
          sortByPrice: selectSort ? selectSort : null,
          searchValue: searchValue ? searchValue : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    return router.push(url);
  };

  const handleSerchProductsByModel = (model: {
    id: string;
    name: string;
    modelName: string;
  }) => {
    if (!model) return;
    setCurrentModel(model);
    const queryParams = qs.parse(window.location.search);
    const searchValue = queryParams?.searchValue;
    const sortByPrice = queryParams?.sortByPrice;

    const currentModelName = Array.isArray(params?.modelName)
      ? params.modelName[0]
      : params?.modelName;

    // Отримуємо всі сегменти шляху
    const pathSegments = pathname.split("/").filter(Boolean);

    // Видаляємо попередню модель, якщо вона є
    if (currentModelName) {
      const modelIndex = pathSegments.indexOf(currentModelName);
      if (modelIndex !== -1) {
        pathSegments.splice(modelIndex, 1);
      }
    }

    // Додаємо нову модель
    pathSegments.push(model.modelName);

    // Формуємо новий шлях
    const newPath = `/${pathSegments.join("/")}`;

    const url = qs.stringifyUrl(
      {
        url: newPath,
        query: {
          sortByPrice: sortByPrice ? sortByPrice : null,
          searchValue: searchValue ? searchValue : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    setIsOpen(false);
    return router.replace(url);
  };

  const sortedModels = sortCarModels(models);

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
          {/* <div
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
                  variant={"ghost"}
                  key={item?.id}
                  className={cn("flex items-start ml-0", {
                    "text-[#c0092a] font-medium":
                      params?.modelName === item?.modelName,
                  })}
                >
                  {item?.name}
                </Button>
              );
            })}
          </div> */}
          <div
            className={cn(
              "rounded-lg bg-[#FFFDFD] shadow-md p-4 z-20 flex flex-col transform transition-all origin-top duration-300 absolute top-[105%] scale-y-0 border border-solid w-full right-0",
              {
                "scale-y-1": isOpen,
              }
            )}
          >
            <List
              height={176} // 4 елементи по 44px (або змінюй за потребою)
              itemCount={sortedModels.length}
              itemSize={44} // висота одного елемента
              width="100%"
            >
              {({ index, style }) => {
                const item = sortedModels[index];
                return (
                  <Button
                    onClick={() => handleSerchProductsByModel(item)}
                    variant={"ghost"}
                    key={item?.id}
                    className={cn("flex items-start ml-0", {
                      "text-[#c0092a] font-medium":
                        params?.modelName === item?.modelName,
                    })}
                    style={style} // Важливо додати для коректного відображення
                  >
                    {item?.name}
                  </Button>
                );
              }}
            </List>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchByModel;
