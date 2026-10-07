"use client";

import { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/search-bar";
import SearchByVinCode from "@/components/search-by-vin-code/search-by-vin-code";
import HeaderLogoLink from "./header-logo-link";
import HeaderCatalogMenu from "./header-catalog-menu";
import HeaderContact from "./header-contact";
import HeaderAccountMenu from "./header-account-menu";
import HeaderCartMenu from "./header-cart-menu";
import { CheckoutHeader } from "./checkout-header";
import LanguageSwitcher from "@/components/language-switcher";
import CurrencySwitcher from "@/components/currency-switcher";
import { MAIN_PHONE_HREF } from "@/entities/store/model/contacts";

/**
 * Композиційний корінь — тільки розкладка й компонування фіч, без власної
 * бізнес-логіки. П'ять піддерев (лого, каталог, контакти, акаунт, кошик)
 * винесені в сусідні файли; кожен сам відповідає за свій стан.
 *
 * `isShowCatalog` лишається тут (не всередині `HeaderCatalogMenu`), бо
 * потрібен ще й самому кореню — підняти z-index `<header>` і показати
 * затемнення позаду меню.
 *
 * Прибрано при переносі: мертвий стан прокрутки `isShow` (керував лише
 * закоментованим `<div>`, ніде не рендерився) і закоментований банер
 * "сайт ще на стадії розробки".
 */
const Header = () => {
  const [isShowCatalog, setIsShowCatalog] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("a11y");
  const params = useParams();
  const shouldBeFixed =
    pathname.includes("/categories") || Boolean(params?.modelName);
  const homePage = pathname.endsWith("/");
  // На картці товару VIN є в блоці «Підходить до», а плаваюча кнопка на телефоні закривала «Купити».
  const isProductPage = pathname.includes("/product/");

  if (pathname.includes("/checkout")) return <CheckoutHeader />;

  return (
    <>
      <header
        className={cn("bg-[#FFFDFD] z-20", {
          "fixed top-0 left-0 w-full": shouldBeFixed || homePage,
          "z-30": isShowCatalog,
        })}
      >
        <div className="bg-[#484848] text-[#FFFDFD]">
          <div className="flex items-center gap-4 justify-between container">
            <HeaderLogoLink className="hidden lg:block" />

            <HeaderCatalogMenu
              isOpen={isShowCatalog}
              onToggle={setIsShowCatalog}
            />

            <HeaderLogoLink className="lg:hidden" />

            <SearchBar />
            <div className={isProductPage ? "hidden md:contents" : "contents"}>
              <SearchByVinCode />
            </div>

            <Link href={MAIN_PHONE_HREF} className="lg:hidden" aria-label={t("callUs")}>
              <PhoneCall className="stroke-[#FFFDFD]" />
            </Link>

            <HeaderContact />

            <div className="items-center gap-3 hidden lg:flex">
              <CurrencySwitcher />
              <LanguageSwitcher />
              <HeaderAccountMenu />
              <HeaderCartMenu />
            </div>
          </div>
        </div>
      </header>

      {isShowCatalog && (
        <div className="bg-[#4848484D] fixed top-0 left-0 w-full h-full z-20" />
      )}
    </>
  );
};

export default Header;
