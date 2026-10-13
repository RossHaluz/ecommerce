import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { ModelSeries } from "../lib/model-series";

interface ModelSeriesGridProps {
  series: ModelSeries[];
  activeSeries?: string;
  onPick: (series: ModelSeries) => void;
}

export const ModelSeriesGrid = ({ series, activeSeries, onPick }: ModelSeriesGridProps) => {
  const t = useTranslations("myAudi");

  return (
    <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
      {series.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onPick(item)}
          className={cn(
            "flex h-14 flex-col items-center justify-center rounded-xl",
            item.key === activeSeries ? "bg-[#C0092A] text-white" : "bg-[#F2F2F2] text-[#2E2E2E] hover:bg-[#E4E4E4]"
          )}
        >
          <span className="text-[17px] font-extrabold">{item.key}</span>
          <span className="text-[11px] opacity-80">{t("generations", { count: item.models.length })}</span>
        </button>
      ))}
    </div>
  );
};
