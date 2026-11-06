"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const t = useTranslations("account.order");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="flex min-h-11 shrink-0 items-center rounded-lg border border-[#CFCFCF] bg-white px-3 text-[13px] font-bold text-[#2E2E2E]"
    >
      {t(copied ? "copied" : "copy")}
    </button>
  );
};
