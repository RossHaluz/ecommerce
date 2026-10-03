"use client";

import { useTranslations } from "next-intl";
import Catalog from "/public/images/catalog.svg";
import Arrow from "/public/images/arrow-down.svg";
import { Button } from "@/components/ui/button";
import { MenuAccountEntry } from "./menu-account-entry";
import { MenuInfoLinks } from "./menu-info-links";
import { MenuContacts } from "./menu-contacts";
import type { MobileMenuPanel } from "./mobile-menu-panel";

interface MenuMainPanelProps {
  onOpenPanel: (panel: MobileMenuPanel) => void;
  onNavigate: () => void;
}

export const MenuMainPanel = ({ onOpenPanel, onNavigate }: MenuMainPanelProps) => {
  const t = useTranslations("nav");

  return (
    <div className="flex flex-col gap-[15px]">
      <Button
        className="bg-[#F2F2F2] rounded-[5px] p-4 h-auto flex items-center justify-between hover:bg-[#F2F2F2]"
        onClick={() => onOpenPanel("catalog")}
      >
        <span className="flex items-center gap-2 text-[#484848] text-base font-semibold">
          <Catalog className="stroke-[#484848]" aria-hidden />
          {t("catalogProducts")}
        </span>
        <Arrow className="-rotate-90 stroke-[#484848]" aria-hidden />
      </Button>

      <MenuAccountEntry onSignIn={() => onOpenPanel("account")} onNavigate={onNavigate} />
      <MenuInfoLinks onNavigate={onNavigate} />
      <MenuContacts />
    </div>
  );
};
