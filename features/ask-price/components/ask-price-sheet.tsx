"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { productTitle } from "@/entities/product/model/product-heading";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import { askPriceText, type AskPriceSubject } from "../model/ask-price-text";
import { AskPriceForm } from "./ask-price-form";
import { AskPriceMessengers } from "./ask-price-messengers";

interface AskPriceSheetProps {
  product: AskPriceSubject;
  /** Кнопка «Дізнатися ціну»: кожне місце малює її по-своєму, шторка одна. */
  renderTrigger: (open: () => void) => ReactNode;
}

/** Для товару з договірною ціною: «Купити» без ціни не натискають, а запитати ціну — легко. */
export const AskPriceSheet = ({ product, renderTrigger }: AskPriceSheetProps) => {
  const t = useTranslations("askPrice");
  const [open, setOpen] = useState(false);
  const isPhone = useIsSmallScreen(1023);
  const text = askPriceText(product);

  return (
    <>
      {renderTrigger(() => setOpen(true))}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side={isPhone ? "bottom" : "right"}
          className="flex flex-col gap-4 bg-white p-4 text-[#2E2E2E] max-lg:rounded-t-2xl sm:max-w-[420px] lg:p-6"
        >
          <SheetHeader className="space-y-1 pr-8 text-left">
            <SheetTitle className="text-xl font-extrabold text-[#2E2E2E]">{t("title")}</SheetTitle>
            <SheetDescription className="text-sm text-[#484848]">{t("lead")}</SheetDescription>
          </SheetHeader>
          <p className="m-0 rounded-lg bg-[#F7F7F7] px-3 py-2 text-sm">
            <strong className="block text-[15px]">{productTitle(product.title)}</strong>
            {product.catalog_number && <span className="text-[#6B6B6B]">OE {product.catalog_number}</span>}
          </p>
          <AskPriceForm text={text} />
          <AskPriceMessengers text={text} />
        </SheetContent>
      </Sheet>
    </>
  );
};
