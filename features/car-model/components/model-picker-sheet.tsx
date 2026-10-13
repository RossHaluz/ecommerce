"use client";

import { useMemo, useState } from "react";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import type { Model } from "@/lib/types";
import { groupModels } from "../lib/model-series";
import { useMyModel } from "../hooks/use-my-model";
import { ModelPickerHeader } from "./model-picker-header";
import { ModelSeriesGrid } from "./model-series-grid";
import { ModelGenerationList } from "./model-generation-list";
import { ModelOthers } from "./model-others";
import { ModelPickerFooter } from "./model-picker-footer";

interface ModelPickerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ModelPickerSheet = ({ open, onOpenChange }: ModelPickerSheetProps) => {
  const { models, current, choose, clear } = useMyModel();
  const isPhone = useIsSmallScreen(1023);
  const grouped = useMemo(() => groupModels(models), [models]);
  const [seriesKey, setSeriesKey] = useState<string>();
  const series = grouped.audi.find((item) => item.key === seriesKey);

  const close = () => {
    onOpenChange(false);
    setSeriesKey(undefined);
  };
  const pick = (model: Model) => {
    choose(model);
    close();
  };

  return (
    <Sheet open={open} onOpenChange={(next) => (next ? onOpenChange(true) : close())}>
      <SheetContent
        side={isPhone ? "bottom" : "right"}
        className="flex flex-col gap-0 bg-white p-0 text-[#484848] max-lg:max-h-[92vh] max-lg:rounded-t-2xl sm:max-w-[480px]"
      >
        <SheetHeader className="space-y-0 px-4 pb-2 pt-4 text-left">
          <ModelPickerHeader series={series?.key} onBack={() => setSeriesKey(undefined)} />
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-4 pb-4 pt-2">
          {series ? (
            <ModelGenerationList models={series.models} currentModelName={current?.modelName} onChoose={pick} />
          ) : (
            <>
              <ModelSeriesGrid
                series={grouped.audi}
                activeSeries={current && grouped.audi.find((item) => item.models.includes(current))?.key}
                // Одне покоління — питати нічого: одразу показуємо деталі.
                onPick={(item) => (item.models.length === 1 ? pick(item.models[0]) : setSeriesKey(item.key))}
              />
              <ModelOthers models={grouped.others} onChoose={pick} />
            </>
          )}
        </div>
        <ModelPickerFooter
          onClear={
            current
              ? () => {
                  clear();
                  close();
                }
              : undefined
          }
        />
      </SheetContent>
    </Sheet>
  );
};
