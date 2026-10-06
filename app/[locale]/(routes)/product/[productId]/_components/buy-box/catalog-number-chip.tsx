"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";

const COPIED_MS = 2000;

/** OE-номер одним дотиком у буфер: його звіряють з деталлю і вставляють у пошук. */
export const CatalogNumberChip = ({ value }: { value: string }) => {
  const t = useTranslations("product");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPIED_MS);
    } catch {
      // Буфер недоступний (старий браузер, http) — номер однаково видно й можна виділити.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      // Назва починається з видимого «OE …» — інакше голосове керування не знайде кнопку (WCAG 2.5.3).
      aria-label={`OE ${value} — ${t("copyCatalogNumber")}`}
      className="inline-flex items-center gap-1.5 min-h-[36px] px-3 rounded-md border border-[#DDDDDD] bg-[#FAFAFA] text-sm font-bold text-[#2E2E2E]"
    >
      OE {value}
      {copied ? <Check size={16} className="text-[#008038]" aria-hidden /> : <Copy size={16} className="text-[#6B6B6B]" aria-hidden />}
      <span className="sr-only" aria-live="polite">{copied ? t("copied") : ""}</span>
    </button>
  );
};
