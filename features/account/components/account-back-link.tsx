import type { ComponentProps } from "react";
import { Link } from "@/i18n/routing";

/** The phone has no sidebar, so every inner page needs this way back. */
export const AccountBackLink = ({ href, label }: { href: ComponentProps<typeof Link>["href"]; label: string }) => (
  <Link href={href} className="flex min-h-11 items-center self-start text-sm font-extrabold text-[#2E2E2E] lg:hidden">
    ‹ {label}
  </Link>
);
