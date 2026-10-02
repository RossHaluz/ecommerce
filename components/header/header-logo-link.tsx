"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Logo from "@/components/ui/logo";
import { cn } from "@/lib/utils";

interface HeaderLogoLinkProps {
  className?: string;
}

type HomeHref = { pathname: "/"; query: Record<string, string> };

const HOME: HomeHref = { pathname: "/", query: {} };

// prefetch={false}: лого видно на кожній сторінці, і Next щоразу тягнув 56 КБ
// головної, відбираючи канал у головного фото на телефоні. Головна й так з кешу.
const LogoAnchor = ({ className, href }: HeaderLogoLinkProps & { href: HomeHref }) => {
  const t = useTranslations("nav");
  return (
    <Link href={href} prefetch={false} aria-label={t("logoAriaLabel")} className={cn("py-3", className)}>
      <Logo className="h-[34px] w-[56px]" />
    </Link>
  );
};

/** Зберігає вибрану модель і сортування з поточного URL. */
const LogoWithFilters = (props: HeaderLogoLinkProps) => {
  const params = useSearchParams();
  const query = { ...HOME.query };
  const modelId = params.get("modelId");
  const sortByPrice = params.get("sortByPrice");
  if (modelId) query.modelId = modelId;
  if (sortByPrice) query.sortByPrice = sortByPrice;
  return <LogoAnchor {...props} href={{ pathname: "/", query }} />;
};

/**
 * Справжнє посилання, а не кнопка з onClick: працює ще до гідратації (на
 * повільному телефоні тап по кнопці в ці секунди губився). Suspense-запасний
 * варіант — те саме посилання без фільтрів, воно й потрапляє в SSR-HTML.
 */
const HeaderLogoLink = (props: HeaderLogoLinkProps) => (
  <Suspense fallback={<LogoAnchor {...props} href={HOME} />}>
    <LogoWithFilters {...props} />
  </Suspense>
);

export default HeaderLogoLink;
