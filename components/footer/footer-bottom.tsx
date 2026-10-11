import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/language-switcher";
import CurrencySwitcher from "@/components/currency-switcher";

export const FooterBottom = () => {
  const t = useTranslations("footer");

  return (
    <div className="border-t border-[#444444]">
      <div className="container flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3.5 text-[13px]">
        <p>
          © {new Date().getFullYear()} Audiparts<span className="hidden md:inline"> · {t("payment")}</span>
        </p>
        <div className="flex items-center gap-5 text-white md:order-last">
          <LanguageSwitcher />
          <CurrencySwitcher />
        </div>
        <p className="w-full md:mr-auto md:w-auto">
          {t("developedBy")} —{" "}
          <a href="https://t.me/rosshaluzinskyi" target="_blank" rel="noopener noreferrer" className="underline">
            Rostyslav Haluzinskiy
          </a>
        </p>
      </div>
    </div>
  );
};
