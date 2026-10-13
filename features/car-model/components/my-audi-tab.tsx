"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CarFront } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMyModel } from "../hooks/use-my-model";
import { ModelPickerSheet } from "./model-picker-sheet";

/** Запам'ятована машина — один тап до її деталей; ще не обрана — одразу вибір. */
export const MyAudiTab = ({ className }: { className?: string }) => {
  const t = useTranslations("myAudi");
  const { current, remembered, choose } = useMyModel();
  const [open, setOpen] = useState(false);
  const isActive = Boolean(current);

  const onClick = () => (remembered && !current ? choose(remembered) : setOpen(true));

  return (
    <>
      <button type="button" onClick={onClick} className={cn(className, isActive && "text-[#C0092A]")}>
        <CarFront size={22} strokeWidth={1.6} aria-hidden />
        {t("tab")}
      </button>
      <ModelPickerSheet open={open} onOpenChange={setOpen} />
    </>
  );
};
