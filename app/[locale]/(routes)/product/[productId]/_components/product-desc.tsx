"use client";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface ProductDescProps {
  description: string;
}

const MAX_COLLAPSED_HEIGHT = 80;

const ProductDesc: FC<ProductDescProps> = ({ description }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("product");

  useEffect(() => {
    if (!descriptionRef.current) return;
    setIsOverflowing(
      descriptionRef.current.scrollHeight > MAX_COLLAPSED_HEIGHT
    );
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
          {isHidden ? t("readMore") : t("collapse")}
        </Button>
      )}
    </div>
  );
};

export default ProductDesc;
