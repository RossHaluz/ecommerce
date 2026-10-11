"use client";

import { useId, useState, type ReactNode } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** На телефоні — акордеон, з md — завжди відкрита колонка із заголовком. */
export const FooterSection = ({ title, children }: { title: string; children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();
  const Icon = isOpen ? Minus : Plus;

  return (
    <nav aria-label={title} className="border-b border-[#444444] md:border-0">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-[52px] w-full items-center justify-between text-base font-extrabold text-white md:hidden"
      >
        {title}
        <Icon size={20} aria-hidden />
      </button>
      <h3 className="mb-3 hidden text-[15px] font-extrabold text-white md:block">{title}</h3>
      <ul id={contentId} className={cn("flex-col pb-2 md:flex md:gap-2.5 md:pb-0", isOpen ? "flex" : "hidden")}>
        {children}
      </ul>
    </nav>
  );
};
