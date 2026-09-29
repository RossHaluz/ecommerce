"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import ArrowDown from "/public/images/arrow-down.svg";
import CatalogIcon from "/public/images/catalog.svg";
import { Button } from "@/components/ui/button";
import Categories from "@/app/[locale]/(routes)/(main)/_components/categories";
import { useCategories } from "@/features/catalog";
import { handleClickOutside } from "@/utils/click-outside";
import { cn } from "@/lib/utils";

interface HeaderCatalogMenuProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

/**
 * Контрольований компонент: чи відкрито меню, вирішує композиційний корінь
 * (`header/header.tsx`) — йому також потрібно знати про це, щоб підняти
 * z-index самого `<header>` і показати затемнення позаду меню. Тут — лише
 * тригер, панель і клік-поза-межами.
 */
const HeaderCatalogMenu = ({ isOpen, onToggle }: HeaderCatalogMenuProps) => {
  const { data: categories = [] } = useCategories();
  const catalogRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("nav");

  useEffect(() => {
    const handleOutsideClick = handleClickOutside(catalogRef, onToggle);
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [onToggle]);

  return (
    <div className="relative" ref={catalogRef}>
      <Button
        aria-label={t("catalogProducts")}
        variant="ghost"
        className="px-6 h-full py-[18px] bg-[#636363] w-[302px] text-[#FFFDFD] text-[16px] leading-[19.5px] font-medium hidden lg:flex items-center justify-between"
        onClick={() => onToggle(!isOpen)}
      >
        <div className="flex items-center gap-6">
          <CatalogIcon className="stroke-[#FFFDFD]" />
          {t("catalog")}
        </div>

        <ArrowDown
          className={cn(
            "stroke-[#FFFDFD] transform transition-all duration-300 rotate-0",
            { "rotate-180": isOpen }
          )}
        />
      </Button>

      <div
        className={cn(
          "absolute top-full right-0 border transform transition-all duration-300 scale-y-0 origin-top z-50",
          { "scale-y-100": isOpen }
        )}
      >
        <Categories categories={categories} />
      </div>
    </div>
  );
};

export default HeaderCatalogMenu;
