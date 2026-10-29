"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCategories } from "@/features/catalog";
import { cn } from "@/lib/utils";
import RenderCategoryItems from "@/components/render-category-items";
import { LoginPanel } from "@/features/auth";
import { MobileMenuHeader } from "./mobile-menu-header";
import { MenuMainPanel } from "./menu-main-panel";
import type { MobileMenuPanel } from "./mobile-menu-panel";

interface MobileMenuProps {
  panel: MobileMenuPanel;
  onPanelChange: (panel: MobileMenuPanel) => void;
  onClose: () => void;
}

/**
 * Одне меню на сторінку, і лише відкрите. Раніше їх було три постійно
 * змонтовані копії — кожна зі своїм каталогом і формою входу.
 */
export const MobileMenu = ({ panel, onPanelChange, onClose }: MobileMenuProps) => {
  const t = useTranslations("a11y");
  const { data: categories = [] } = useCategories();
  const router = useRouter();
  const [isShown, setIsShown] = useState(false);

  // Перший кадр — за правим краєм, наступний — на місці: так зберігається виїзд.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsShown(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const close = () => {
    // Після входу в кабінет серверні частини сторінки мають побачити сесію.
    if (panel === "account") router.refresh();
    onClose();
  };

  // Старі компоненти закривають меню через setIsOpen(false).
  const setIsOpen: Dispatch<SetStateAction<boolean>> = (value) => {
    if (value === false) onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      {/* Затемнення — теж «закрити»: шторка не на весь екран, і повз неї тиснуть, щоб вийти. */}
      <button
        type="button"
        aria-label={t("close")}
        onClick={close}
        className={cn("absolute inset-0 bg-black/55 transition-opacity duration-150", isShown ? "opacity-100" : "opacity-0")}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute inset-y-0 left-0 flex w-[min(336px,88vw)] flex-col overflow-y-auto bg-white transition-transform duration-150",
          isShown ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <MobileMenuHeader panel={panel} onBack={() => onPanelChange("menu")} onClose={close} />
        <div className="flex flex-1 flex-col gap-4 px-4 py-3">
          {panel === "menu" && <MenuMainPanel onOpenPanel={onPanelChange} onNavigate={onClose} />}
          {panel === "catalog" && <RenderCategoryItems categories={categories} setIsOpen={setIsOpen} isOpen />}
          {panel === "account" && <LoginPanel onClose={onClose} />}
        </div>
      </div>
    </div>,
    document.body
  );
};
