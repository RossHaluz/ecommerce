"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import HomeIcon from "/public/images/home-icon.svg";
import ShopIcon from "/public/images/shop-icon.svg";
import CatalogIcon from "/public/images/catalog-icon.svg";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { selectOrderItems } from "@/redux/order/selector";
import { selectFavorites } from "@/redux/favorites/selectors";
import { CartSheet } from "@/features/cart";
import { MyAudiTab } from "@/features/car-model/components/my-audi-tab";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { MobileMenu } from "./mobile-menu/mobile-menu";
import { MenuTrigger } from "./mobile-menu/menu-trigger";
import { TabBadge } from "./tab-badge";
import type { MobileMenuPanel } from "./mobile-menu/mobile-menu-panel";

const ITEM_CLASS = "relative flex flex-col items-center gap-1 text-[11px] leading-none font-bold text-[#484848]";

/** Головна · Каталог · Моя Audi · Обране · Кошик. Кабінет і решта — у меню ☰ шапки. */
const MobileSidebar = () => {
  const pathname = usePathname();
  const cartCount = useHydratedSelector(selectOrderItems)?.length ?? 0;
  const favoritesCount = useHydratedSelector(selectFavorites).length;
  const t = useTranslations();
  // null — меню закрите й не змонтоване.
  const [menuPanel, setMenuPanel] = useState<MobileMenuPanel | null>(null);
  const isHome = pathname === "/";

  return (
    <>
      <div className="fixed w-full bottom-0 right-0 py-2.5 z-[12] shadow-custom-shadow container bg-[#FFFDFD] flex items-center justify-between gap-2 lg:hidden">
        {/* prefetch={false}: панель видно на кожній мобільній сторінці, і Next щоразу
            тягнув 56 КБ головної, відбираючи канал у головного фото. */}
        <Link href="/" prefetch={false} className={cn(ITEM_CLASS, { "text-[#C0092A]": isHome })}>
          <HomeIcon className={cn("fill-[#111111]", { "fill-[#C0092A]": isHome })} />
          {t("nav.home")}
        </Link>

        <MenuTrigger icon={<CatalogIcon />} label={t("nav.catalog")} onClick={() => setMenuPanel("catalog")} />

        <MyAudiTab className={ITEM_CLASS} />

        <Link href="/favorites" prefetch={false} className={cn(ITEM_CLASS, { "text-[#C0092A]": pathname === "/favorites" })}>
          <Heart size={22} strokeWidth={1.6} aria-hidden />
          {t("nav.favorites")}
          <TabBadge count={favoritesCount} />
        </Link>

        <CartSheet
          heading={t("cart.title", { count: cartCount })}
          trigger={
            <Button variant="ghost" className={cn("h-auto p-0 hover:bg-transparent", ITEM_CLASS)}>
              <ShopIcon />
              {t("nav.cart")}
              <TabBadge count={cartCount} />
            </Button>
          }
        />
      </div>

      {menuPanel && (
        <MobileMenu panel={menuPanel} onPanelChange={setMenuPanel} onClose={() => setMenuPanel(null)} />
      )}
    </>
  );
};

export default MobileSidebar;
