import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface ProductNavigationProps {
  currentNavigation: string;
  setCurrentNavigation: React.Dispatch<React.SetStateAction<string>>;
}

const ProductNavigation: FC<ProductNavigationProps> = ({
  currentNavigation,
  setCurrentNavigation,
}) => {
  return (
    <div className="flex items-center  gap-[30px] overflow-hidden overflow-x-auto border-b border-[#7FAA84]">
      <div className="relative">
        <Button
          variant="ghost"
          type="button"
          className="px-0 py-0"
          onClick={() => setCurrentNavigation("desc")}
        >
          Опис
        </Button>
        {currentNavigation === "desc" && (
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[#484848]" />
        )}
      </div>
      <div className="relative">
        <Button
          variant="ghost"
          type="button"
          className="px-0 py-0"
          onClick={() => setCurrentNavigation("characteristic")}
        >
          Характеристики
        </Button>
        {currentNavigation === "characteristic" && (
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[#484848]" />
        )}
      </div>
{/* 
      <div className="relative">
        <Button
          variant="ghost"
          type="button"
          className="px-0 py-0"
          onClick={() => setCurrentNavigation("care")}
        >
          Догляд
        </Button>
        {currentNavigation === "care" && (
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[#484848]" />
        )}
      </div> */}
      
      <div className="relative">
        <Button
          variant="ghost"
          type="button"
          className="px-0 py-0"
          onClick={() => setCurrentNavigation("review")}
        >
          Відгуки
        </Button>
        {currentNavigation === "review" && (
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[#484848]" />
        )}
      </div>
    </div>
  );
};

export default ProductNavigation;
