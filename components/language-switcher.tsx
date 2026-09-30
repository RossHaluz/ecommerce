"use client";

import { Suspense } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/routing";
import { LOCALES, LOCALE_LABELS } from "@/i18n/locales";
import { cn } from "@/lib/utils";
import { switcherOptionClass } from "@/components/ui/switcher-option";

interface LanguageSwitcherProps {
  className?: string;
}

/**
 * `usePathname`/`Link` тут — саме локалізовані (з `@/i18n/routing`), не
 * `next/navigation`/`next/link`: тільки вони вміють підставити/прибрати
 * префікс `/pl` за `locale` пропом, не ламаючи поточний шлях.
 */
const LanguageSwitcherLinks = ({ className }: LanguageSwitcherProps) => {
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
          // next-intl будує посилання на поточну мову з префіксом (/uk/...),
          // сервер відповідає 307 — фоновий префетч лише марнував запит.
          prefetch={false}
          aria-current={code === locale ? "true" : undefined}
          className={switcherOptionClass(code === locale)}
        >
          {code}
          <span className="sr-only"> {LOCALE_LABELS[code]}</span>
        </Link>
      ))}
    </div>
  );
};

/**
 * `useSearchParams()` вимагає Suspense-межу для статичного пре-рендеру —
 * компонент живе в Header/Footer (тобто на кожній сторінці), тож обгортка
 * тут, а не в кожного викликача: інакше `next build` падає на ВСІХ сторінках
 * одразу (саме так це і сталось при першому підключенні).
 */
const LanguageSwitcher = (props: LanguageSwitcherProps) => (
  <Suspense fallback={null}>
    <LanguageSwitcherLinks {...props} />
  </Suspense>
);

export default LanguageSwitcher;
