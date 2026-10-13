import { useTranslations } from "next-intl";
import SearchByVinCode from "@/components/search-by-vin-code/search-by-vin-code";

/** Хто не знає моделі — не застрягає: VIN закриває питання, «для всіх» — скидає вибір. */
export const ModelPickerFooter = ({ onClear }: { onClear?: () => void }) => {
  const t = useTranslations("myAudi");

  return (
    <div className="flex flex-col gap-1.5 border-t border-[#EEEEEE] px-4 pb-4 pt-3">
      <SearchByVinCode
        trigger={
          <button type="button" className="h-12 w-full rounded-lg bg-[#2E2E2E] text-[15px] font-extrabold text-white">
            {t("vinHelp")}
          </button>
        }
      />
      {onClear && (
        <button type="button" onClick={onClear} className="h-10 text-sm font-bold text-[#484848] underline">
          {t("forAll")}
        </button>
      )}
    </div>
  );
};
