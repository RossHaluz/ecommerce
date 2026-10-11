import LanguageSwitcher from "@/components/language-switcher";
import CurrencySwitcher from "@/components/currency-switcher";

/** Мова й валюта — внизу меню: потрібні рідко, але мають бути під рукою. */
export const MenuSettings = () => (
  <div className="mt-auto flex items-center justify-between border-t border-[#EEEEEE] pt-3 text-[#484848]">
    <LanguageSwitcher />
    <CurrencySwitcher />
  </div>
);
