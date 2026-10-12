"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
// next-intl: шлях без префікса мови — головна завжди «/», і на /pl теж.
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/search-bar";
import SearchByVinCode from "@/components/search-by-vin-code/search-by-vin-code";
import HeaderLogoLink from "./header-logo-link";
import { HeaderCatalogMenu } from "./catalog-menu/header-catalog-menu";
import HeaderContact from "./header-contact";
import HeaderAccountMenu from "./header-account-menu";
import HeaderCartMenu from "./header-cart-menu";
import { HeaderFavoritesLink } from "./header-favorites-link";
import { CheckoutHeader } from "./checkout-header";
import { HeaderTopBar } from "./header-top-bar";
import { HeaderMenuButton } from "./header-menu-button";

const Header = () => {
  const [isShowCatalog, setIsShowCatalog] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const shouldBeFixed =
    pathname.includes("/categories") || Boolean(params?.modelName);
  const homePage = pathname === "/";
  // На картці товару VIN є в блоці «Підходить до», а плаваюча кнопка на телефоні закривала «Купити».
  const isProductPage = pathname.includes("/product/");

  if (pathname.includes("/checkout")) return <CheckoutHeader />;

  return (
    <>
      <HeaderTopBar />
      <header
        className={cn("bg-[#FFFDFD] z-20", {
          // sticky, не fixed: шапка займає своє місце, і сторінкам не треба вгадувати її висоту відступом.
          "sticky top-0": shouldBeFixed || homePage,
          // Панель каталогу позиціюється від шапки — їй потрібен positioned-предок і без sticky.
          relative: !(shouldBeFixed || homePage),
          "z-30": isShowCatalog,
        })}
      >
        <div className="bg-[#484848] text-[#FFFDFD]">
          <div className="flex items-center gap-2 lg:gap-4 justify-between container py-2.5 lg:py-3">
            <HeaderMenuButton />
            <HeaderLogoLink className="hidden lg:block" />

            <HeaderCatalogMenu
              isOpen={isShowCatalog}
              onToggle={setIsShowCatalog}
            />

            <SearchBar />
            <div className={isProductPage ? "hidden md:contents" : "contents"}>
              <SearchByVinCode />
            </div>

            {/* Телефон: логотип живе в меню, а тут — кошик (телефон є в меню й у віджеті зв'язку). */}
            <div className="shrink-0 lg:hidden">
              <HeaderCartMenu compact />
            </div>

            <HeaderContact />

            <div className="items-center gap-1 hidden lg:flex">
              <HeaderAccountMenu />
              <HeaderFavoritesLink />
              <HeaderCartMenu />
            </div>
          </div>
        </div>
      </header>

      {isShowCatalog && (
        <div aria-hidden onClick={() => setIsShowCatalog(false)} className="fixed inset-0 z-20 bg-[rgba(20,20,20,0.45)]" />
      )}
    </>
  );
};

export default Header;
