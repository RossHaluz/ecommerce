"use client";
import { Button } from "@/components/ui/button";
import React, { FC, useState } from "react";

interface ProductDescProps {
  description: string;
}

const ProductDesc: FC<ProductDescProps> = ({ description }) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div>
      <p
        className={`text-[#484848] text-xs transition-all duration-300  ${
          isHidden ? "line-clamp-6" : "line-clamp-none"
        }`}
      >
        {description}
      </p>

      <Button
        variant="ghost"
        onClick={() => setIsHidden((prev) => !prev)}
        className="text-[#7FAA84] underline text-sm font-bold px-0"
      >
        {isHidden ? "Читати далі" : "Згорнути"}
      </Button>
    </div>
  );
};

export default ProductDesc;
