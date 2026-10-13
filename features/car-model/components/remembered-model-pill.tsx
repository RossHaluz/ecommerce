import { useTranslations } from "next-intl";
import { CarFront, RefreshCw } from "lucide-react";
import { formatModelName } from "@/lib/seo/format-model-name";
import { PILL, PILL_ICON_BUTTON } from "./model-pill";

interface RememberedModelPillProps {
  name: string;
  onShow: () => void;
  onChange: () => void;
}

/** Машина з минулого візиту: один тап — її деталі; «змінити» — всередині плашки, як × у червоній. */
export const RememberedModelPill = ({ name, onShow, onChange }: RememberedModelPillProps) => {
  const t = useTranslations("myAudi");
  const model = formatModelName(name);

  return (
    <div className="flex h-11 min-w-0 flex-1 items-center rounded-[10px] border-2 border-[#C0092A] text-[#C0092A] md:flex-none">
      <button type="button" onClick={onShow} aria-label={t("showFor", { model })} className={`${PILL} flex-1 pr-1`}>
        <CarFront size={20} className="shrink-0" aria-hidden />
        {/* На телефоні в рядку ще «Фільтри» — лишаємо саму модель, повна фраза — для скрінрідера й з md. */}
        <span className="truncate md:hidden">{model}</span>
        <span className="hidden truncate md:inline">{t("showFor", { model })}</span>
      </button>
      <button type="button" onClick={onChange} aria-label={t("change")} className={`${PILL_ICON_BUTTON} bg-[#FFF1F2]`}>
        <RefreshCw size={16} strokeWidth={2.5} aria-hidden />
      </button>
    </div>
  );
};
