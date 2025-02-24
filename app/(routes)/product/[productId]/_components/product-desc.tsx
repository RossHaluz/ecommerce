"use client";
import { Button } from "@/components/ui/button";
import React, { FC, useEffect, useRef, useState } from "react";

interface ProductDescProps {
  description: string;
}

const ProductDesc: FC<ProductDescProps> = ({ description }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const maxHeigth = 80;

  useEffect(() => {
    if (descriptionRef.current) {
      const contenctHeight = descriptionRef.current.scrollHeight;
      if (contenctHeight > maxHeigth) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    }
  }, [description]);

  return (
    <div>
      <div ref={descriptionRef}>
        <div
          className="text-[#484848] text-xs"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      {isOverflowing && (
        <Button
          variant="ghost"
          onClick={() => setIsHidden((prev) => !prev)}
          className="text-[#111] underline text-sm font-bold px-0"
        >
          {isHidden ? "Читати далі" : "Згорнути"}
        </Button>
      )}
    </div>
  );
};

export default ProductDesc;
