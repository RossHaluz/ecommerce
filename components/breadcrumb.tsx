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

interface BreadcrumbsProps {
  productName?: string;
}

interface QueryCrumbs {
  from?: string | null;
  searchValue?: string | null;
}

const BreadcrumbsView: FC<BreadcrumbsProps & QueryCrumbs> = ({ productName, from, searchValue }) => {
  const pathname = usePathname();
  const locale = useParams()?.locale as string | undefined;
  const t = useTranslations("nav");

  const trail: Crumb[] = productName
    ? [
        ...buildBreadcrumbTrail({ path: from ?? "", locale, lastIsCurrent: false }),
        { label: productName, href: null },
      ]
    : buildBreadcrumbTrail({ path: pathname, locale, searchValue });

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
                <BreadcrumbLink href={href} className="break-words text-gray-600">
                  {label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="break-words">{label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const BreadcrumbsFromQuery: FC<BreadcrumbsProps> = (props) => {
  const query = useSearchParams();
  return <BreadcrumbsView {...props} from={query.get("from")} searchValue={query.get("searchValue")} />;
};

/**
 * Власна Suspense-межа: без неї useSearchParams на кешованій сторінці віддає
 * весь вміст найближчому fallback (у layout це «Loading..»), і HTML порожніє.
 */
const Breadcrumbs: FC<BreadcrumbsProps> = (props) => (
  <Suspense fallback={<BreadcrumbsView {...props} />}>
    <BreadcrumbsFromQuery {...props} />
  </Suspense>
);

export default Breadcrumbs;
