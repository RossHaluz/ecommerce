"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { LogoutButton } from "./logout-button";

const ITEMS = [
  { href: "/account", key: "overview" },
  { href: "/account/orders", key: "orders" },
  { href: "/favorites", key: "favorites" },
  { href: "/account/profile", key: "profile" },
] as const;

const ITEM = "flex min-h-[46px] w-full items-center rounded-[10px] px-3 text-left text-[15px]";

const isCurrent = (pathname: string, href: string) =>
  href === "/account" ? pathname === href : pathname.startsWith(href);

export const AccountNav = () => {
  const t = useTranslations("account.nav");
  const pathname = usePathname();

  return (
    <nav aria-label={t("label")} className="flex flex-col rounded-[14px] bg-white p-2">
      {ITEMS.map(({ href, key }) => {
        const current = isCurrent(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={current ? "page" : undefined}
            className={`${ITEM} ${current ? "bg-[#F2F2F2] font-extrabold text-[#C0092A]" : "font-semibold text-[#2E2E2E]"}`}
          >
            {t(key)}
          </Link>
        );
      })}
      <LogoutButton className={`${ITEM} font-semibold text-[#2E2E2E]`} />
    </nav>
  );
};
