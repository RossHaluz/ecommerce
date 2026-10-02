"use client";

import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/language-switcher";
import CurrencySwitcher from "@/components/currency-switcher";
import { FooterContacts } from "./footer-contacts";
import { FooterCatalog } from "./footer-catalog";
import { FooterInfo } from "./footer-info";
import { FooterSocials } from "./footer-socials";
import { FooterCopyright } from "./footer-copyright";

const Footer = () => {
  const pathname = usePathname();
  // На цих сторінках телефон показує фіксовану нижню панель (mobile-sidebar) — даємо їй місце.
  const hasMobileBottomBar = pathname === "/" || pathname.startsWith("/categories");

  return (
    <footer className="bg-[#484848] text-[#FFFDFD] overflow-hidden">
      <div
        className={cn("container pt-6 lg:py-12 flex flex-col gap-[15px]", {
          "pb-20": hasMobileBottomBar,
          "pb-6": !hasMobileBottomBar,
        })}
      >
        <div className="md:flex justify-between md:gap-8 lg:gap-[90px]">
          <FooterContacts />
          <FooterCatalog />
          <div className="flex flex-col md:gap-6">
            <FooterInfo />
            <FooterSocials />
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 md:justify-start">
          <CurrencySwitcher />
          <LanguageSwitcher />
        </div>

        <FooterCopyright />
      </div>
    </footer>
  );
};

export default Footer;
