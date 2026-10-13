"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/** Увесь текст — у HTML для Google; людині — кілька рядків і «Читати повністю», щоб не відсував товари. */
export const SeoText = ({ title, text }: { title: string; text: string }) => {
  const t = useTranslations("seo");
  const [expanded, setExpanded] = useState(false);
  const paragraphs = text.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);
  if (!paragraphs.length) return null;

  return (
    <section className="mt-8 flex flex-col gap-2 rounded-xl bg-white p-4 lg:p-6">
      <h2 className="text-lg font-extrabold text-[#2E2E2E] lg:text-xl">{title}</h2>
      <div className={cn("flex flex-col gap-3 text-[15px] leading-6 text-[#484848]", !expanded && "line-clamp-4")}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <button type="button" onClick={() => setExpanded((open) => !open)} className="self-start py-2 text-sm font-extrabold text-[#C0092A]">
        {expanded ? t("collapse") : t("readMore")}
      </button>
    </section>
  );
};
