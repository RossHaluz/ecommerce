"use client";
import React, { FC, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import qs from "query-string";

interface Category {
  name: string;
  id: string;
  category_name: string;
  children?: Category[];
  parentId: string;
}

interface CategoriesProps {
  categories: {
    id: string;
    name: string;
    category_name: string;
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
  const [currenrtModel, setCurrentModel] = useState("");
  const [isInitialization, setIsInitialization] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    setIsInitialization(true);
  }, []);

  useEffect(() => {
    if (!isInitialization) return;

    const model = Array.isArray(params?.modelName)
      ? params?.modelName[0]
      : params?.modelName;
    if (model) {
      setCurrentModel(model);
    }
  }, [params, isInitialization]);

  const handleClickCategory = (id: string) => {
    const queryParams = qs.parse(window.location.search);
    const sortByPrice = queryParams.sortByPrice as string;

    const newPath = currenrtModel
      ? `/categories/${id}/${currenrtModel}`
      : `/categories/${id}`;

    const url = qs.stringifyUrl(
      {
        url: newPath,
        query: {
          sortByPrice: sortByPrice ? sortByPrice : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    return router.push(url);
  };

  const renderChildren = (children: Category[]) => {
    return (
      <div className="absolute left-full top-0 bg-[#FFFDFD] shadow-lg rounded-r-md p-2 w-full h-full overflow-hidden overflow-y-auto z-30">
        {children.map((child) => (
          <button
            onClick={() => handleClickCategory(child?.category_name)}
            key={child.id}
            className=" py-1 px-6 hover:bg-transparent text-base font-medium text-left text-[#111111] w-full"
          >
            {child.name}
          </button>
        ))}
      </div>
    );
  };

  const renderCategory = (category: Category): React.ReactNode => {
    return (
      <div
        key={category.id}
        onMouseEnter={() => setHoveredCategory(category.category_name)}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <button
          onClick={() => handleClickCategory(category?.category_name)}
          className="w-full flex items-start justify-between gap-2 py-1 px-6 text-base text-left font-medium  text-[#111111]"
        >
          {category.name}
          {category.children && category.children.length > 0 && (
            <ChevronDown className="transform transition-all duration-300 -rotate-90" />
          )}
        </button>

        {hoveredCategory === category.category_name &&
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
          "hidden lg:flex flex-col rounded-md  bg-[#FFFDFD] border border-solid border-[#111] w-full py-2 relative",
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
