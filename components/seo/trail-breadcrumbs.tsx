import { Fragment } from "react";
import { Home } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Crumb } from "@/lib/breadcrumbs/build-breadcrumb-trail";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/** Хлібні крихти з готового шляху — серверний рендер, без клієнтського JS і без ?from=. */
export const TrailBreadcrumbs = ({ trail, homeLabel }: { trail: Crumb[]; homeLabel: string }) => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="/" prefetch={false} aria-label={homeLabel}>
            <Home size={16} className="stroke-gray-500" />
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {trail.map(({ label, href }) => (
        <Fragment key={href ?? label}>
          <BreadcrumbSeparator className="text-gray-500" />
          <BreadcrumbItem>
            {href ? (
              <BreadcrumbLink asChild>
                <Link href={href} prefetch={false} className="text-gray-600">
                  {label}
                </Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        </Fragment>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
);
