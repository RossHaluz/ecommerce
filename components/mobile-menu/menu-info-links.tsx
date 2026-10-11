"use client";

import { useTranslations } from "next-intl";
import { INFO_LINKS } from "@/lib/navigation/info-links";
import { MenuRow } from "./menu-row";

export const MenuInfoLinks = ({ onNavigate }: { onNavigate: () => void }) => {
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("buyers")} className="flex flex-col">
      <span className="text-xs font-extrabold uppercase tracking-[0.04em] text-[#6B6B6B]">{t("buyers")}</span>
      {INFO_LINKS.map(({ href, labelKey }) => (
        <MenuRow key={href} href={href} label={t(labelKey)} onClick={onNavigate} />
      ))}
    </nav>
  );
};
