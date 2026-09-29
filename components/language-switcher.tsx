"use client";

import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/routing";
import { LOCALES, LOCALE_LABELS } from "@/i18n/locales";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

/**
 * `usePathname`/`Link` тут — саме локалізовані (з `@/i18n/routing`), не
 * `next/navigation`/`next/link`: тільки вони вміють підставити/прибрати
 * префікс `/pl` за `locale` пропом, не ламаючи поточний шлях.
 */
const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const href = query ? `${pathname}?${query}` : pathname;

  return (
    <div className={cn("flex items-center gap-2 text-xs font-semibold", className)}>
      {LOCALES.map((code) => (
        <Link
          key={code}
          href={href}
          locale={code}
          aria-label={LOCALE_LABELS[code]}
          className={cn("uppercase transition-colors", {
            "text-[#c0092a]": code === locale,
            "opacity-60 hover:opacity-100": code !== locale,
          })}
        >
          {code}
        </Link>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
