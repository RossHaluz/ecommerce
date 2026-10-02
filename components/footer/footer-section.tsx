"use client";

import { useState, type ReactNode } from "react";
import ArrowDown from "/public/images/arrow-down.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** На телефоні — згортається кнопкою, з md і ширше — завжди відкрита із заголовком. */
export const FooterSection = ({ title, children }: { title: string; children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 md:mb-0 flex flex-col md:gap-5">
      <Button
        variant="ghost"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="md:hidden font-semibold text-sm p-0 h-auto mb-[15px] flex items-center justify-between w-full"
      >
        {title}
        <ArrowDown
          className={cn("stroke-current transform transition-all duration-300", {
            "rotate-180": isOpen,
          })}
        />
      </Button>
      <h3 className="hidden md:block text-[24px] leading-[33.6px]">{title}</h3>

      <div className={cn("flex-col gap-[15px] md:gap-5 text-current md:flex", isOpen ? "flex" : "hidden")}>
        {children}
      </div>
    </div>
  );
};
