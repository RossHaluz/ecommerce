"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { INFO_LINKS } from "@/lib/navigation/info-links";

export const MenuInfoLinks = ({ onNavigate }: { onNavigate: () => void }) => {
  const t = useTranslations("nav");

  return (
    <ul className="bg-[#F2F2F2] rounded-[5px] py-[13px] px-[15px] flex flex-col gap-[30px]">
      {INFO_LINKS.map(({ href, labelKey }) => (
        <li key={href}>
          <Link href={href} prefetch={false} onClick={onNavigate} className="text-base text-[#484848]">
            {t(labelKey)}
          </Link>
        </li>
      ))}
    </ul>
  );
};
