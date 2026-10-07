"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import HomeIcon from "/public/images/home-icon.svg";
import ShopIcon from "/public/images/shop-icon.svg";
import InfoIcon from "/public/images/info-icon.svg";
import AccountIcon from "/public/images/account-icon.svg";
import CatalogIcon from "/public/images/catalog-icon.svg";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { selectOrderItems } from "@/redux/order/selector";
import { useCurrentUser } from "@/features/account";
import { CartSheet } from "@/features/cart";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { MobileMenu } from "./mobile-menu/mobile-menu";
import { MenuTrigger } from "./mobile-menu/menu-trigger";
import type { MobileMenuPanel } from "./mobile-menu/mobile-menu-panel";

const ITEM_CLASS = "flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium";

const MobileSidebar = () => {
  const pathname = usePathname();
  const orderItems = useHydratedSelector(selectOrderItems);
  const { data: user } = useCurrentUser();
  const t = useTranslations();
  // null — меню закрите й не змонтоване.
  const [menuPanel, setMenuPanel] = useState<MobileMenuPanel | null>(null);
  const isCatalogPage = pathname === "/" || pathname.includes("/categories");

  return (
    <>
      <div className="fixed w-full bottom-0 right-0 py-3 z-[12] shadow-custom-shadow container bg-[#FFFDFD] flex items-center justify-between gap-4 lg:hidden">
        {/* prefetch={false}: панель видно на кожній мобільній сторінці, і Next щоразу
            тягнув 56 КБ головної, відбираючи канал у головного фото. */}
        <Link href="/" prefetch={false} className={cn(ITEM_CLASS, { "text-[#C0092A]": isCatalogPage })}>
          <HomeIcon className={cn("fill-[#111111]", { "fill-[#C0092A]": isCatalogPage })} />
          {t("nav.home")}
        </Link>

        <MenuTrigger icon={<CatalogIcon />} label={t("nav.categories")} onClick={() => setMenuPanel("catalog")} />

        <CartSheet
          heading={t("cart.title", { count: orderItems?.length ?? 0 })}
          trigger={
            <Button variant="ghost" className={cn("p-0 hover:bg-transparent", ITEM_CLASS)}>
              <ShopIcon />
              {t("nav.cart")}
            </Button>
          }
        />

        <MenuTrigger icon={<InfoIcon />} label={t("nav.information")} onClick={() => setMenuPanel("menu")} />

        {user ? (
          <Link href="/account" prefetch={false} className={ITEM_CLASS}>
            <AccountIcon />
            {t("nav.account")}
          </Link>
        ) : (
          <MenuTrigger icon={<AccountIcon />} label={t("nav.account")} onClick={() => setMenuPanel("account")} />
        )}
      </div>

      {menuPanel && (
        <MobileMenu panel={menuPanel} onPanelChange={setMenuPanel} onClose={() => setMenuPanel(null)} />
      )}
    </>
  );
};

export default MobileSidebar;
