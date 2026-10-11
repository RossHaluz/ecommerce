"use client";

import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { FooterLeadBand } from "./footer-lead-band";
import { FooterAbout } from "./footer-about";
import { FooterCatalog } from "./footer-catalog";
import { FooterModels } from "./footer-models";
import { FooterBuyers } from "./footer-buyers";
import { FooterBottom } from "./footer-bottom";

const Footer = () => {
  const pathname = usePathname();
  // На цих сторінках телефон показує фіксовану нижню панель (mobile-sidebar) — даємо їй місце.
  const hasMobileBottomBar = pathname === "/" || pathname.startsWith("/categories");

  return (
    <footer className={cn("bg-[#2E2E2E] text-[#D0D0D0] md:pb-0", hasMobileBottomBar && "pb-16")}>
      <FooterLeadBand />
      <div className="container flex flex-col py-2 md:grid md:grid-cols-2 md:gap-8 md:py-9 lg:grid-cols-[1.3fr_repeat(3,minmax(0,1fr))]">
        <div className="order-last md:order-none">
          <FooterAbout />
        </div>
        <FooterCatalog />
        <FooterModels />
        <FooterBuyers />
      </div>
      <FooterBottom />
    </footer>
  );
};

export default Footer;
