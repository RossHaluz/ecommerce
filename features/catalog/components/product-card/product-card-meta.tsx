"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { fittingModel } from "@/entities/product/model/fitting-model";
import { useModels } from "../../hooks/use-models";
import type { Product } from "@/lib/types";

/** Артикул називають менеджеру по телефону, OE — за ним звіряють деталь; «Підходить до» — лише в списку моделі. */
export const ProductCardMeta = ({ item }: { item: Product }) => {
  const t = useTranslations("product");
  const params = useParams<{ modelName?: string }>();
  const { data: models = [] } = useModels();
  const model = fittingModel(models, params?.modelName);

  return (
    <div className="flex flex-col gap-0.5 text-xs md:text-[13px]">
      {(item.article || item.catalog_number) && (
        // Переноситься, а не обрізається: на вузькій картці телефона OE інакше губився б за артикулом.
        <span className="flex min-w-0 flex-wrap gap-x-2 text-[#6B6B6B]">
          {item.article && (
            <span className="whitespace-nowrap">
              {t("article")} <b className="font-bold text-[#2E2E2E]">{item.article}</b>
            </span>
          )}
          {item.catalog_number && <span className="min-w-0 truncate">OE {item.catalog_number}</span>}
        </span>
      )}
      {model && (
        <span className="flex items-center gap-1 font-extrabold text-[#1E7B3C]">
          <Check size={14} strokeWidth={3} className="shrink-0" aria-hidden />
          {/* На вузькій картці телефона модель уже видно в плашці над списком — досить «Підходить». */}
          <span className="truncate md:hidden">{t("fits")}</span>
          <span className="hidden truncate md:inline">{t("fitsModel", { model })}</span>
        </span>
      )}
    </div>
  );
};
