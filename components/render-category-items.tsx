"use client";
import React, {
  FC,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { Button } from "./ui/button";
import Arrow from "/public/images/arrow-down.svg";
import queryString from "query-string";
import { useRouter } from "next/navigation";

interface Category {
  name: string;
  id: string;
  category_name: string;
  children?: Category[];
}

interface RenderCategoryItemsProps {
  categories: Category[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

const RenderCategoryItems: FC<RenderCategoryItemsProps> = ({
  categories,
  setIsOpen,
  isOpen,
}) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      setOpenCategories([]);
    }
  }, [isOpen]);

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  const handleOpenCategory = (categoryName: string) => {
    const queryParams = queryString.parse(window.location.search);
    const modelId = queryParams?.modelId as string;
    const sortByPrice = queryParams.sortByPrice as string;

    const url = queryString.stringifyUrl(
      {
        url: `/categories/${categoryName}`,
        query: {
          modelId: modelId ? modelId : null,
          sortByPrice: sortByPrice ? sortByPrice : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    setIsOpen(false);
    return router.push(url);
  };

  const renderCategory = (category: Category) => (
    <li
      key={category.id}
      className="bg-[#F2F2F2] rounded-[5px] py-[13px] px-[15px]"
    >
      <div className="flex items-center justify-between">
        <Button
          className="flex-1 flex items-center justify-start text-base"
          onClick={() => handleOpenCategory(category.category_name)}
          variant="ghost"
        >
          {category.name}
        </Button>
        {category.children && category.children.length > 0 && (
          <Button
            variant="ghost"
            type="button"
            className="p-0"
            onClick={() => toggleCategory(category.id)}
          >
            <Arrow
              className={`transform transition-transform ${
                openCategories.includes(category.id) ? "rotate-0" : "-rotate-90"
              } stroke-[#484848]`}
            />
          </Button>
        )}
      </div>
      {openCategories.includes(category.id) && category.children && (
        <ul className="pl-2 space-y-2">
          {category.children.map((child) => renderCategory(child))}
        </ul>
      )}
    </li>
  );

  return (
    <ul className="flex flex-col gap-[15px]">
      {categories.map((category) => renderCategory(category))}
    </ul>
  );
};

export default RenderCategoryItems;
