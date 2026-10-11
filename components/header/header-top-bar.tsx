import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "@/components/language-switcher";
import CurrencySwitcher from "@/components/currency-switcher";

/**
 * Комп'ютер: обіцянки, що знімають сумніви ще до каталогу, і службові перемикачі.
 * Поза <header>, тож при прокрутці їде вгору — закріплюється лише основний рядок.
 */
export const HeaderTopBar = () => {
  const t = useTranslations();

  return (
    <div className="hidden bg-[#2E2E2E] text-[13px] text-[#E4E4E4] lg:block">
      <div className="container flex h-9 items-center justify-between gap-6">
        <ul className="m-0 flex list-none gap-5 p-0">
          <li>{t("advantages.deliveryUkraine")}</li>
          <li>{t("advantages.exchangeGuarantee")}</li>
          <li>{t("nav.vinCheck")}</li>
        </ul>
        <div className="flex items-center gap-4">
          <Link href="/contacts" prefetch={false} className="text-[#E4E4E4] hover:text-white">
            {t("nav.contacts")}
          </Link>
          <span aria-hidden className="h-4 w-px bg-[#5A5A5A]" />
          <CurrencySwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};
