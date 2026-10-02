"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import ArrowDown from "/public/images/arrow-down.svg";
import { Button } from "@/components/ui/button";
import { MAIN_PHONE, PHONE_NUMBERS } from "@/entities/store/model/contacts";
import { handleClickOutside } from "@/utils/click-outside";
import { cn } from "@/lib/utils";

/** Головний номер, що розкриває список усіх менеджерів. Спільний для шапки й футера. */
export const PhoneNumbersDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations("contact.managers");

  useEffect(() => {
    const onOutsideClick = handleClickOutside(ref, setIsOpen);
    window.addEventListener("mousedown", onOutsideClick);
    return () => window.removeEventListener("mousedown", onOutsideClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <Button
        aria-haspopup="true"
        aria-expanded={isOpen}
        variant="ghost"
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-0 h-auto flex items-center gap-2 text-[16px] leading-[19.5px] font-medium"
      >
        {MAIN_PHONE.display}
        <ArrowDown
          className={cn("stroke-[#FFFDFD] transform transition-all duration-300", {
            "rotate-180": isOpen,
          })}
        />
      </Button>

      <div
        className={cn(
          "bg-[#FFFDFD] rounded-md shadow-md absolute top-full left-0 p-4 origin-top scale-y-0 transform transition-all duration-300 border z-50 w-max flex flex-col gap-4",
          { "scale-y-100": isOpen }
        )}
      >
        {PHONE_NUMBERS.map(({ tel, display, manager }) => (
          <a key={tel} href={`tel:${tel}`} className="text-[#111111] text-[16px] leading-[19.5px]">
            {display} - {t(manager)}
          </a>
        ))}
      </div>
    </div>
  );
};
