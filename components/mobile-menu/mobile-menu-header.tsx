"use client";

import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import Arrow from "/public/images/arrow-down.svg";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import type { MobileMenuPanel } from "./mobile-menu-panel";

interface MobileMenuHeaderProps {
  panel: MobileMenuPanel;
  onBack: () => void;
  onClose: () => void;
}

export const MobileMenuHeader = ({ panel, onBack, onClose }: MobileMenuHeaderProps) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="p-4">
        <Logo className="w-[158px] h-auto mx-auto" unoptimized />
      </div>

      <div className="flex items-center justify-between gap-4">
        {panel === "catalog" ? (
          <Button
            variant="ghost"
            aria-label={t("nav.back")}
            className="p-0 hover:bg-transparent flex items-center gap-5"
            onClick={onBack}
          >
            <Arrow className="rotate-90 stroke-[#484848]" aria-hidden />
            <span className="text-[#484848] text-base font-semibold">{t("nav.catalogProducts")}</span>
          </Button>
        ) : (
          <h2 className="text-base font-semibold text-[#484848]">
            {panel === "account" ? t("nav.signInTitle") : t("nav.menu")}
          </h2>
        )}

        <Button variant="ghost" aria-label={t("a11y.close")} onClick={onClose} className="p-0 h-auto">
          <X className="stroke-[#484848]" aria-hidden />
        </Button>
      </div>
    </div>
  );
};
