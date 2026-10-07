"use client";

import { useTranslations } from "next-intl";
import { ChevronLeft, Phone } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { MAIN_PHONE, MAIN_PHONE_HREF } from "@/entities/store/model/contacts";
import HeaderLogoLink from "./header-logo-link";

/** Оформлення без каталогу й пошуку: людина, що вже купує, не має куди відволіктися. Телефон лишаємо — для сумнівів. */
export const CheckoutHeader = () => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <header className="bg-[#484848] text-white">
      <div className="container flex h-14 items-center justify-between gap-2 lg:h-[72px]">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label={t("a11y.back")}
          className="-ml-2 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <ChevronLeft size={24} aria-hidden />
        </button>
        <span aria-hidden className="flex-1 text-lg font-extrabold lg:hidden">
          {t("checkout.title")}
        </span>
        <HeaderLogoLink className="hidden lg:block" />
        <a href={MAIN_PHONE_HREF} className="flex items-center gap-2 font-bold" aria-label={`${t("checkout.questions")} ${MAIN_PHONE.display}`}>
          <Phone size={20} aria-hidden className="lg:hidden" />
          <span className="hidden lg:inline">
            {t("checkout.questions")} {MAIN_PHONE.display}
          </span>
        </a>
      </div>
    </header>
  );
};
