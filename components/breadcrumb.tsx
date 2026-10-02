"use client";
import React, { FC } from "react";
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

const Breadcrumbs: FC<BreadcrumbsProps> = ({ productName }) => {
  const pathname = usePathname();
  const query = useSearchParams();
  const locale = useParams()?.locale as string | undefined;
  const t = useTranslations("nav");

  const trail: Crumb[] = productName
    ? [
        ...buildBreadcrumbTrail({ path: query.get("from") ?? "", locale, lastIsCurrent: false }),
        { label: productName, href: null },
      ]
    : buildBreadcrumbTrail({ path: pathname, locale, searchValue: query.get("searchValue") });

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

export default Breadcrumbs;
