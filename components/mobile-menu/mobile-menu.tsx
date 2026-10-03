"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useCategories } from "@/features/catalog";
import { cn } from "@/lib/utils";
import RenderCategoryItems from "@/components/render-category-items";
import AuthorizationOtp from "@/components/authirization-otp";
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
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        "fixed inset-0 z-[100] h-screen overflow-y-auto bg-white transform transition-transform duration-150",
        isShown ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="px-5 pb-2 flex flex-col gap-[15px]">
        <MobileMenuHeader panel={panel} onBack={() => onPanelChange("menu")} onClose={close} />

        {panel === "menu" && <MenuMainPanel onOpenPanel={onPanelChange} onNavigate={onClose} />}
        {panel === "catalog" && <RenderCategoryItems categories={categories} setIsOpen={setIsOpen} isOpen />}
        {panel === "account" && <AuthorizationOtp setIsOpen={setIsOpen} />}
      </div>
    </div>,
    document.body
  );
};
