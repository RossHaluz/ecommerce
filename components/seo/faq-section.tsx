import { ChevronDown } from "lucide-react";
import { buildFaqJsonLd, type FaqItem } from "@/lib/seo/faq-json-ld";
import { JsonLd } from "./json-ld";

/** <details> без JS: відповіді в HTML для Google, а людина розгортає лише потрібне. */
export const FaqSection = ({ title, items }: { title: string; items: FaqItem[] }) => (
  <section className="mt-8 flex flex-col gap-3">
    <h2 className="text-lg font-extrabold text-[#2E2E2E] lg:text-xl">{title}</h2>
    <div className="flex flex-col divide-y divide-[#EEEEEE] rounded-xl bg-white px-4">
      {items.map((item) => (
        <details key={item.question} className="group py-3">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-bold text-[#2E2E2E] [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown size={18} className="shrink-0 text-[#6B6B6B] transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <p className="pb-1 pt-1 text-[15px] leading-6 text-[#484848]">{item.answer}</p>
        </details>
      ))}
    </div>
    <JsonLd data={buildFaqJsonLd(items)} />
  </section>
);
