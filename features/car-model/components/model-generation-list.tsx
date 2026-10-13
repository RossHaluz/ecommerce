import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { formatModelName } from "@/lib/seo/format-model-name";
import type { Model } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ModelGenerationListProps {
  models: Model[];
  currentModelName?: string;
  onChoose: (model: Model) => void;
}

export const ModelGenerationList = ({ models, currentModelName, onChoose }: ModelGenerationListProps) => {
  const t = useTranslations("myAudi");

  return (
    <div className="flex flex-col gap-2">
      {models.map((model) => (
        <button
          key={model.id}
          type="button"
          onClick={() => onChoose(model)}
          className={cn(
            "flex min-h-[56px] items-center gap-3 rounded-xl px-4 text-left text-base font-extrabold text-[#2E2E2E]",
            model.modelName === currentModelName ? "border-2 border-[#C0092A] bg-[#FFF7F8]" : "bg-[#F7F7F7] hover:bg-[#EEEEEE]"
          )}
        >
          <span className="flex-1">{formatModelName(model.name)}</span>
          <ChevronRight size={18} className="text-[#6B6B6B]" aria-hidden />
        </button>
      ))}
      <p className="pt-1 text-[13px] leading-[18px] text-[#6B6B6B]">{t("yearHint")}</p>
    </div>
  );
};
