import { useTranslations } from "next-intl";
import { ChevronLeft } from "lucide-react";
import { SheetDescription, SheetTitle } from "@/components/ui/sheet";

/** Крок 1 — серія, крок 2 — покоління: людина знає, скільки ще лишилось. */
export const ModelPickerHeader = ({ series, onBack }: { series?: string; onBack: () => void }) => {
  const t = useTranslations("myAudi");

  return (
    <div className="flex items-center gap-1 pr-10">
      {series && (
        <button type="button" onClick={onBack} aria-label={t("back")} className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center text-[#2E2E2E]">
          <ChevronLeft size={24} aria-hidden />
        </button>
      )}
      <div className="flex flex-col">
        <SheetDescription className="text-xs font-bold text-[#6B6B6B]">
          {series ? t("seriesStep", { series }) : t("step", { step: 1 })}
        </SheetDescription>
        <SheetTitle className="text-xl font-extrabold text-[#2E2E2E]">{series ? t("generationTitle") : t("choose")}</SheetTitle>
      </div>
    </div>
  );
};
