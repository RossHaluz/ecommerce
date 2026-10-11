"use client";

import { useEffect } from "react";
import { CatalogMenuTrigger } from "./catalog-menu-trigger";
import { CatalogMegaPanel } from "./catalog-mega-panel";

interface HeaderCatalogMenuProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

/** Відкритість тримає шапка: їй самій треба показати затемнення, клік по якому меню закриває. */
export const HeaderCatalogMenu = ({ isOpen, onToggle }: HeaderCatalogMenuProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onToggle(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, onToggle]);

  return (
    <>
      <CatalogMenuTrigger isOpen={isOpen} onToggle={() => onToggle(!isOpen)} />
      {isOpen && (
        <div className="absolute inset-x-0 top-full z-30 hidden pt-2 lg:block">
          <div className="container">
            <CatalogMegaPanel onNavigate={() => onToggle(false)} />
          </div>
        </div>
      )}
    </>
  );
};
