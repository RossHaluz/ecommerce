"use client";
import { Link, usePathname } from "@/i18n/routing";
import HomeIcon from "/public/images/home-icon.svg";
import ShopIcon from "/public/images/shop-icon.svg";
import InfoIcon from "/public/images/info-icon.svg";
import AccountIcon from "/public/images/account-icon.svg";
import CatalogIcon from "/public/images/catalog-icon.svg";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import CatalogItems from "./catalog-items";
import MobileMenu from "./ui/mobile-menu";
import Modal from "./ui/modal";
import { selectOrderItems } from "@/redux/order/selector";
import ProductCount from "@/app/[locale]/(routes)/product/[productId]/_components/product-count";
import { useCurrentUser } from "@/features/account";
import { CartPreview, useRemoveFromCart } from "@/features/cart";
import { useCategories } from "@/features/catalog";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";

const MobileSidebar = () => {
  const pathname = usePathname();
  const [isShowCatalog, setIsShowCatalog] = useState(false);
  const { data: categories = [] } = useCategories();
  const orderItems = useHydratedSelector(selectOrderItems);
  const [isLogin, setIsLogin] = useState(true);
  const [isActive, setIsActive] = useState("");
  const removeFromCart = useRemoveFromCart();
  const { data: user } = useCurrentUser();
  const t = useTranslations();

  return (
    <>
      <div className="fixed w-full bottom-0 right-0 py-3 z-[12] shadow-custom-shadow container bg-[#FFFDFD] flex items-center justify-between gap-4 lg:hidden">
        {/* prefetch={false}: панель видно на кожній мобільній сторінці, і Next щоразу
            тягнув 56 КБ головної, відбираючи канал у головного фото. */}
        <Link
          href="/"
          prefetch={false}
          className={cn(
            "flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium",
            {
              "text-[#C0092A]": pathname === "/" || pathname.includes("/categories"),
            }
          )}
        >
          <HomeIcon
            className={cn("fill-[#111111]", {
              "fill-[#C0092A]":
                pathname === "/" || pathname.includes("/categories"),
            })}
          />
          {t("nav.home")}
        </Link>

        <MobileMenu
          setIsLogin={setIsLogin}
          openBtn={
            <div className="p-0 hover:bg-transparent flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium">
              <CatalogIcon />
              {t("nav.categories")}
            </div>
          }
          setIsActive={setIsActive}
          isActive={isActive ? isActive : "catalog"}
          isLogin={isLogin}
        />

        <Modal
          triggetBtn={
            <Button
              variant="ghost"
              className="p-0 hover:bg-transparent flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium"
            >
              <ShopIcon />
              {t("nav.cart")}
            </Button>
          }
          title={t("nav.cart")}
        >
          <CartPreview
            items={orderItems}
            onRemove={removeFromCart}
            renderExtra={(item) => (
              <ProductCount
                count={item.quantity}
                itemId={item.orderItemId}
                isFromOrder
                savePrice={item.priceForOne}
              />
            )}
          />
        </Modal>

        <MobileMenu
          setIsLogin={setIsLogin}
          openBtn={
            <div className="p-0 hover:bg-transparent flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium">
              <InfoIcon />
              {t("nav.information")}
            </div>
          }
          setIsActive={setIsActive}
          isActive={isActive ? isActive : "menu"}
          isLogin={isLogin}
        />

        {user ? (
          <Link
            href="/account"
            prefetch={false}
            className="flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium"
          >
            <AccountIcon />
            {t("nav.account")}
          </Link>
        ) : (
          <MobileMenu
            setIsLogin={setIsLogin}
            openBtn={
              <div className="p-0 hover:bg-transparent flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium">
                <AccountIcon />
                {t("nav.account")}
              </div>
            }
            setIsActive={setIsActive}
            isActive={isActive ? isActive : "account"}
            isLogin={isLogin}
          />
        )}
      </div>
      <div
        className={`absolute top-0 left-0 z-30 h-screen w-full transform transition-opacity duration-300 ${
          isShowCatalog ? "opacity-1" : "opacity-0 hidden"
        }`}
      >
        <CatalogItems
          categories={categories}
          setIsShowCatelog={setIsShowCatalog}
          isShowCatalog={isShowCatalog}
        />
      </div>
    </>
  );
};

export default MobileSidebar;
