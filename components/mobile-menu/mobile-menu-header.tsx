"use client";

import { useTranslations } from "next-intl";
import { ChevronLeft, X } from "lucide-react";
import Logo from "@/components/ui/logo";
import type { MobileMenuPanel } from "./mobile-menu-panel";

interface MobileMenuHeaderProps {
  panel: MobileMenuPanel;
  onBack: () => void;
  onClose: () => void;
}

const ICON_BUTTON = "flex h-11 w-11 shrink-0 items-center justify-center text-white";

/** Темна смуга як шапка сайту: на головній панелі — логотип, у вкладених — «назад» і назва. */
export const MobileMenuHeader = ({ panel, onBack, onClose }: MobileMenuHeaderProps) => {
  const t = useTranslations();
  const title = panel === "catalog" ? t("nav.catalogProducts") : t("nav.signInTitle");

  return (
    <div className="flex h-[60px] shrink-0 items-center justify-between gap-2 bg-[#484848] pl-4 pr-1">
      {panel === "menu" ? (
        <Logo className="text-xl" />
      ) : (
        <div className="-ml-3 flex min-w-0 items-center">
          <button type="button" onClick={onBack} aria-label={t("nav.back")} className={ICON_BUTTON}>
            <ChevronLeft size={24} aria-hidden />
          </button>
          <span className="truncate text-base font-extrabold text-white">{title}</span>
        </div>
      )}
      <button type="button" onClick={onClose} aria-label={t("a11y.close")} className={ICON_BUTTON}>
        <X size={22} aria-hidden />
      </button>
    </div>
  );
};
