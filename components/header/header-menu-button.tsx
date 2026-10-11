"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { MobileMenu } from "@/components/mobile-menu/mobile-menu";
import type { MobileMenuPanel } from "@/components/mobile-menu/mobile-menu-panel";

/** Телефон: меню з будь-якої сторінки, а не лише там, де є нижня панель. */
export const HeaderMenuButton = () => {
  const t = useTranslations("nav");
  // null — меню закрите й не змонтоване.
  const [panel, setPanel] = useState<MobileMenuPanel | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => setPanel("menu")}
        aria-label={t("menu")}
        className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center text-white lg:hidden"
      >
        <Menu size={24} aria-hidden />
      </button>
      {panel && <MobileMenu panel={panel} onPanelChange={setPanel} onClose={() => setPanel(null)} />}
    </>
  );
};
