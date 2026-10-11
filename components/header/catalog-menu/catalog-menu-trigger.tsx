import { useTranslations } from "next-intl";
import { LayoutGrid, X } from "lucide-react";

interface CatalogMenuTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const CatalogMenuTrigger = ({ isOpen, onToggle }: CatalogMenuTriggerProps) => {
  const t = useTranslations("nav");
  const Icon = isOpen ? X : LayoutGrid;

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-haspopup="true"
      onClick={onToggle}
      className="hidden h-11 shrink-0 items-center gap-2 rounded-lg bg-[#C0092A] px-4 text-[15px] font-extrabold text-white hover:bg-[#A30722] lg:flex"
    >
      <Icon size={18} aria-hidden />
      {t("catalog")}
    </button>
  );
};
