"use client";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface Category {
  name: string;
  id: string;
  children?: Category[];
  parentId: string;
}

interface CategoriesListProps {
  categories: Category[];
  setIsShowCatelog: Dispatch<SetStateAction<boolean>>;
  isShowCatalog: boolean;
}

const CatalogItems: FC<CategoriesListProps> = ({
  categories,
  setIsShowCatelog,
  isShowCatalog,
}) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (!isShowCatalog) {
      setOpenCategories({});
    }
  }, [isShowCatalog]);

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderCategory = (category: Category): React.ReactNode => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between relative">
        <Link
          href={`/categories/${category?.id}`}
          onClick={() => setIsShowCatelog(false)}
        >
          {category?.name}
        </Link>
        <Button
          type="button"
          variant="ghost"
          className="p-0 h-auto"
          onClick={() => toggleCategory(category?.id)}
        >
          {category.children && category.children.length > 0 && (
            <ChevronDown
              className={`transform transition-all duration-300 ${
                openCategories[category?.id] ? "rotate-180" : "rotate-0"
              }`}
            />
          )}
        </Button>

        <div
          className={`w-full h-[1px] bg-[#c0092a] absolute -bottom-1 right-0 ${
            category?.parentId && "hidden"
          }`}
        />
      </div>
      {openCategories[category?.id] &&
        category?.children &&
        category?.children?.map((item) => (
          <div
            className="p-2 bg-[#F2F2F2]  rounded-md text-[#484848]"
            key={item?.id}
          >
            {renderCategory(item)}
          </div>
        ))}
    </div>
  );

  return (
    <div className="bg-white p-4 shadow-lg rounded-md h-auto min-w-[300px] border border-solid overflow-y-auto flex flex-col gap-4">
      {categories?.map((item) => renderCategory(item))}
    </div>
  );
};

export default CatalogItems;
