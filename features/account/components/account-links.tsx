import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LogoutButton } from "./logout-button";

const LINKS = [
  { href: "/favorites", title: "favorites", note: "favoritesNote" },
  { href: "/account/profile", title: "profile", note: "profileNote" },
] as const;

/** The phone's menu and the desktop tiles are the same links; only the logout is phone-only. */
export const AccountLinks = () => {
  const t = useTranslations("account.links");

  return (
    <nav className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
        {LINKS.map(({ href, title, note }) => (
          <Link key={href} href={href} className="flex flex-col gap-1 rounded-[14px] bg-white p-3.5 text-[#2E2E2E] lg:rounded-2xl lg:p-[18px]">
            <strong className="text-[15px] lg:text-[17px]">{t(title)}</strong>
            <span className="text-[13px] text-[#6B6B6B] lg:text-sm">{t(note)}</span>
          </Link>
        ))}
      </div>
      <LogoutButton className="min-h-[52px] rounded-[14px] bg-white px-3.5 text-left text-[15px] font-bold text-[#C0092A] lg:hidden" />
    </nav>
  );
};
