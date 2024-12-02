"use client";

import Link from "next/link";
import React, {
  FC,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { Button } from "./ui/button";
import Arrow from "/public/images/arrow-down.svg";

interface Category {
  name: string;
  id: string;
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

  const renderCategory = (category: Category) => (
    <li
      key={category.id}
      className="bg-[#F2F2F2] rounded-[5px] py-[13px] px-[15px]"
    >
      <div className="flex items-center justify-between">
        <Link
          href={`/categories/${category.id}`}
          className="flex-1"
          onClick={() => setIsOpen(false)}
        >
          {category.name}
        </Link>
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
