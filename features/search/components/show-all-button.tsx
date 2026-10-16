"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export const ShowAllButton = ({ total, onClick }: { total: number; onClick: () => void }) => {
  const t = useTranslations("search");

  return (
    <div className="flex items-center gap-3 border-t border-[#EEEEEE] pt-3">
      <button
        type="button"
        onClick={onClick}
        className="flex min-h-[44px] items-center gap-2 rounded-lg bg-[#C0092A] px-4 text-[15px] font-extrabold text-white hover:bg-[#A00823]"
      >
        {t("showAll", { count: total })}
        <ArrowRight aria-hidden className="h-4 w-4" />
      </button>
      <span className="hidden text-sm text-[#8A8A8A] lg:inline">{t("enterHint")}</span>
    </div>
  );
};
