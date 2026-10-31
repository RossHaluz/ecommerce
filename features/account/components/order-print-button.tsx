"use client";

import { useRef } from "react";
import { Printer } from "lucide-react";
import { useTranslations } from "next-intl";
import { useReactToPrint } from "react-to-print";
import type { OrderDetails } from "../model/order-types";
import { OrderPrintSheet } from "./order-print-sheet";

export const OrderPrintButton = ({ order }: { order: OrderDetails }) => {
  const t = useTranslations("account.order");
  const contentRef = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({ contentRef, documentTitle: `Invoice_${order.number}` });

  return (
    <>
      <OrderPrintSheet ref={contentRef} order={order} />
      <button
        type="button"
        onClick={() => print()}
        className="flex min-h-11 items-center justify-center gap-2 rounded-[10px] border-2 border-[#C0092A] px-4 font-extrabold text-[#C0092A]"
      >
        <Printer size={18} aria-hidden /> {t("print")}
      </button>
    </>
  );
};
