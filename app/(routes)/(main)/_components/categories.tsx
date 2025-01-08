"use client";
import React, { FC, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  id: string;
  children?: Category[];
  parentId: string;
}

interface CategoriesProps {
  categories: {
    id: string;
    name: string;
    billboard: {
      label: string;
      imageUrl: string;
    };
    children?: Category[];
    parentId: string;
  }[];
}

const Categories: FC<CategoriesProps> = ({ categories }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredOnMenu, setHoveredOnMenu] = useState(false);

  const renderChildren = (children: Category[]) => {
    return (
      <div className="absolute left-full top-0 bg-[#FFFDFD] shadow-lg rounded-r-md p-2 w-full h-full overflow-hidden overflow-y-auto z-30">
        {children.map((child) => (
          <Link
            href={`/categories/${child.id}`}
            key={child.id}
            className="block py-[18px] px-6 hover:bg-transparent text-[16px] font-medium leading-[19.5px] text-[#111111]"
          >
            {child.name}
          </Link>
        ))}
      </div>
    );
  };

  const renderCategory = (category: Category): React.ReactNode => {
    return (
      <div
        key={category.id}
        onMouseEnter={() => setHoveredCategory(category.id)}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <Link
          href={`/categories/${category.id}`}
          className="w-full flex items-center justify-between py-[18px] px-6 text-[16px] font-medium leading-[19.5px] text-[#111111]"
        >
          {category.name}
          {category.children && category.children.length > 0 && (
            <ChevronDown className="transform transition-all duration-300 -rotate-90" />
          )}
        </Link>

        {hoveredCategory === category.id &&
          category.children &&
          category?.children?.length > 0 &&
          renderChildren(category.children)}
      </div>
    );
  };

  return (
    <>
      <div
        className={cn(
          "hidden lg:flex flex-col rounded-md  bg-[#FFFDFD] w-full py-2 relative",
          {
            "z-50 rounded-l-md rounded-r-none": hoveredOnMenu,
          }
        )}
        onMouseEnter={() => setHoveredOnMenu(true)}
        onMouseLeave={() => setHoveredOnMenu(false)}
      >
        {categories.map((item) => renderCategory(item))}
      </div>

      {hoveredOnMenu && (
        <div
          className={cn("fixed top-0 left-0 w-full h-full bg-[#4848484D]", {
            "z-10": hoveredOnMenu,
          })}
        />
      )}
    </>
  );
};

export default Categories;
