"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CarFront, X } from "lucide-react";
import { formatModelName } from "@/lib/seo/format-model-name";
import { useMyModel } from "../hooks/use-my-model";
import { ModelPickerSheet } from "./model-picker-sheet";

const PILL = "flex h-11 min-w-0 items-center gap-2 rounded-[10px] px-3 text-[15px] font-extrabold";

/** Обрана модель — червона, з ×; запам'ятована — підказка в один тап; жодної — запрошення обрати. */
export const MyModelBar = () => {
  const t = useTranslations("myAudi");
  const { current, remembered, choose, clear } = useMyModel();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2 md:flex-none">
      {current ? (
        <div className="flex h-11 min-w-0 flex-1 items-center rounded-[10px] bg-[#B3132B] text-white md:flex-none">
          <button type="button" onClick={() => setOpen(true)} aria-label={t("change")} className={`${PILL} flex-1 pr-1`}>
            <CarFront size={20} className="shrink-0" aria-hidden />
            <span className="truncate">Audi {formatModelName(current.name)}</span>
          </button>
          <button type="button" onClick={clear} aria-label={t("forAll")} className="m-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
            <X size={16} strokeWidth={3} aria-hidden />
          </button>
        </div>
      ) : remembered ? (
        <>
          <button type="button" onClick={() => choose(remembered)} className={`${PILL} flex-1 border-2 border-[#C0092A] text-[#C0092A] md:flex-none`}>
            <CarFront size={20} className="shrink-0" aria-hidden />
            <span className="truncate">{t("showFor", { model: formatModelName(remembered.name) })}</span>
          </button>
          <button type="button" onClick={() => setOpen(true)} className="h-11 shrink-0 px-2 text-sm font-bold text-[#484848] underline">
            {t("change")}
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`${PILL} flex-1 border-2 border-dashed border-[#C0092A] bg-[#FFF7F8] text-[#C0092A] md:flex-none`}
        >
          <CarFront size={20} className="shrink-0" aria-hidden />
          <span className="truncate">{t("choose")}</span>
          <span className="hidden truncate font-normal text-[#484848] md:inline">· {t("chooseHint")}</span>
        </button>
      )}
      <ModelPickerSheet open={open} onOpenChange={setOpen} />
    </div>
  );
};
