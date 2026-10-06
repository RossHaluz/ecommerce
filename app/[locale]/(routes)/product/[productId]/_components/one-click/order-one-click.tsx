"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { OneClickForm } from "./one-click-form";
import { OneClickSuccess } from "./one-click-success";
import type { OneClickItem } from "./place-one-click-order";

type Placed = { orderNumber: number; phone: string } | null;

const CONTINUE = "h-12 w-full rounded-lg border-2 border-[#C0092A] font-extrabold text-[#C0092A]";

/**
 * «Купити в 1 клік»: телефон — кнопка й шторка знизу; комп'ютер — поле прямо в блоці покупки.
 * Перемикає CSS, а не JS: інакше на телефоні спершу мигала б велика форма (CLS).
 */
export const OrderOneClick = ({ item }: { item: OneClickItem }) => {
  const t = useTranslations("orderOneClick");
  const tProduct = useTranslations("product");
  const tCart = useTranslations("cart");
  const [placed, setPlaced] = useState<Placed>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const onPlaced = (orderNumber: number, phone: string) => setPlaced({ orderNumber, phone });

  return (
    <>
      <div className="lg:hidden">
        <Sheet
          open={sheetOpen}
          onOpenChange={(open) => {
            setSheetOpen(open);
            if (!open) setPlaced(null);
          }}
        >
          <SheetTrigger className="flex h-12 w-full items-center justify-center rounded-lg border-2 border-[#C0092A] text-base font-bold text-[#C0092A]">
            {tProduct("oneClickCta")}
          </SheetTrigger>
          <SheetContent side="bottom" className="flex max-h-[90vh] flex-col gap-4 overflow-y-auto rounded-t-2xl bg-white">
            <SheetTitle className={placed ? "sr-only" : "pr-8 text-xl font-extrabold text-[#2E2E2E]"}>{t("sheetTitle")}</SheetTitle>
            <SheetDescription className="sr-only">{t("benefitCall")}</SheetDescription>
            {placed ? (
              <>
                <OneClickSuccess {...placed} />
                <SheetClose className={CONTINUE}>{tCart("continueShopping")}</SheetClose>
              </>
            ) : (
              <OneClickForm item={item} variant="sheet" onPlaced={onPlaced} />
            )}
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block">
        <OneClickForm item={item} variant="inline" onPlaced={onPlaced} />
        <Dialog open={placed !== null && !sheetOpen} onOpenChange={(open) => !open && setPlaced(null)}>
          <DialogContent className="flex max-w-[480px] flex-col gap-4 rounded-2xl bg-white p-8">
            <DialogTitle className="sr-only">{t("sheetTitle")}</DialogTitle>
            <DialogDescription className="sr-only">{t("benefitCall")}</DialogDescription>
            {placed && <OneClickSuccess {...placed} />}
            <DialogClose className={CONTINUE}>{tCart("continueShopping")}</DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
