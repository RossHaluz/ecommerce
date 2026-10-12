"use client";

import { useTranslations } from "next-intl";
import SearchByVinCode from "@/components/search-by-vin-code/search-by-vin-code";
import { selectOrderItems } from "@/redux/order/selector";
import { selectFavorites } from "@/redux/favorites/selectors";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { MenuAccountEntry } from "./menu-account-entry";
import { MenuRow } from "./menu-row";
import { MenuInfoLinks } from "./menu-info-links";
import { MenuContacts } from "./menu-contacts";
import { MenuSettings } from "./menu-settings";
import type { MobileMenuPanel } from "./mobile-menu-panel";

interface MenuMainPanelProps {
  onOpenPanel: (panel: MobileMenuPanel) => void;
  onNavigate: () => void;
}

export const MenuMainPanel = ({ onOpenPanel, onNavigate }: MenuMainPanelProps) => {
  const t = useTranslations("nav");
  const cartCount = useHydratedSelector(selectOrderItems)?.length ?? 0;
  const favoritesCount = useHydratedSelector(selectFavorites).length;

  return (
    <>
      <MenuAccountEntry onSignIn={() => onOpenPanel("account")} onNavigate={onNavigate} />
      <SearchByVinCode
        trigger={
          <button type="button" className="h-12 w-full rounded-lg bg-[#2E2E2E] text-[15px] font-extrabold text-white">
            {t("vinPick")}
          </button>
        }
      />
      <nav aria-label={t("menu")} className="flex flex-col">
        <MenuRow label={t("catalogProducts")} onClick={() => onOpenPanel("catalog")} />
        <MenuRow label={t("favorites")} href="/favorites" onClick={onNavigate} extra={favoritesCount || undefined} />
        <MenuRow label={t("cart")} href="/cart" onClick={onNavigate} extra={cartCount || undefined} />
      </nav>
      <MenuInfoLinks onNavigate={onNavigate} />
      <MenuContacts />
      <MenuSettings />
    </>
  );
};
