"use client";
import React, { FC, Suspense } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { Home } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { buildBreadcrumbTrail, type Crumb } from "@/lib/breadcrumbs/build-breadcrumb-trail";

const BreadcrumbsView: FC<{ searchValue?: string | null }> = ({ searchValue }) => {
  const pathname = usePathname();
  const locale = useParams()?.locale as string | undefined;
  const t = useTranslations("nav");

  const trail: Crumb[] = buildBreadcrumbTrail({ path: pathname, locale, searchValue });

  return (
    <Breadcrumb className={cn({ hidden: pathname === "/" })}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" aria-label={t("home")}>
            <Home size={16} className="stroke-gray-500" />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {trail.map(({ label, href }, index) => (
          <React.Fragment key={`${index}-${href ?? label}`}>
            <BreadcrumbSeparator className="text-gray-500" />
            <BreadcrumbItem>
              {href ? (
                <BreadcrumbLink href={href} className="text-gray-600">
                  {label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const BreadcrumbsFromQuery = () => {
  const query = useSearchParams();
  return <BreadcrumbsView searchValue={query.get("searchValue")} />;
};

/**
 * Власна Suspense-межа: без неї useSearchParams на кешованій сторінці віддає
 * весь вміст найближчому fallback, і HTML порожніє. Картка товару має власні
 * серверні крихти (TrailBreadcrumbs) — ці лише для каталогу й пошуку.
 */
const Breadcrumbs = () => (
  <Suspense fallback={<BreadcrumbsView />}>
    <BreadcrumbsFromQuery />
  </Suspense>
);

export default Breadcrumbs;
