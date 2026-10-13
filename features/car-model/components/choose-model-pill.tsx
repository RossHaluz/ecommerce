import { useTranslations } from "next-intl";
import { CarFront } from "lucide-react";
import { PILL } from "./model-pill";

/** Моделі ще немає — запрошення, а не порожнє місце: так людина дізнається, що список можна звузити. */
export const ChooseModelPill = ({ onChoose }: { onChoose: () => void }) => {
  const t = useTranslations("myAudi");

  return (
    <button
      type="button"
      onClick={onChoose}
      className={`${PILL} flex-1 border-2 border-dashed border-[#C0092A] bg-[#FFF7F8] text-[#C0092A] md:flex-none`}
    >
      <CarFront size={20} className="shrink-0" aria-hidden />
      <span className="truncate">{t("choose")}</span>
      <span className="hidden truncate font-normal text-[#484848] md:inline">· {t("chooseHint")}</span>
    </button>
  );
};
