import { useTranslations } from "next-intl";
import { CarFront, X } from "lucide-react";
import { formatModelName } from "@/lib/seo/format-model-name";
import { PILL, PILL_ICON_BUTTON } from "./model-pill";

interface CurrentModelPillProps {
  name: string;
  onChange: () => void;
  onClear: () => void;
}

/** Модель уже звужує список: червона, тап — змінити, × — для всіх моделей. */
export const CurrentModelPill = ({ name, onChange, onClear }: CurrentModelPillProps) => {
  const t = useTranslations("myAudi");

  return (
    <div className="flex h-11 min-w-0 flex-1 items-center rounded-[10px] bg-[#B3132B] text-white md:flex-none">
      <button type="button" onClick={onChange} aria-label={t("change")} className={`${PILL} flex-1 pr-1`}>
        <CarFront size={20} className="shrink-0" aria-hidden />
        <span className="truncate">
          <span className="hidden md:inline">Audi </span>
          {formatModelName(name)}
        </span>
      </button>
      <button type="button" onClick={onClear} aria-label={t("forAll")} className={`${PILL_ICON_BUTTON} bg-white/20`}>
        <X size={16} strokeWidth={3} aria-hidden />
      </button>
    </div>
  );
};
