"use client";
import Link from "next/link";
import HomeIcon from "/public/images/home-icon.svg";
import ShopIcon from "/public/images/shop-icon.svg";
import InfoIcon from "/public/images/info-icon.svg";
import AccountIcon from "/public/images/account-icon.svg";
import CatalogIcon from "/public/images/catalog-icon.svg";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import CatalogItems from "./catalog-items";
import { useSelector } from "react-redux";
import { selectCategories } from "@/redux/categories/selectors";
import MobileMenu from "./ui/mobile-menu";
import Modal from "./ui/modal";
import { selectOrderItems } from "@/redux/order/selector";
import ProductCount from "@/app/[locale]/(routes)/product/[productId]/_components/product-count";
import { getCurrentUser } from "@/actions/get-data";
import { CartPreview, useRemoveFromCart } from "@/features/cart";

const MobileSidebar = () => {
  const pathname = usePathname();
  const [isShowCatalog, setIsShowCatalog] = useState(false);
  const categories = useSelector(selectCategories);
  const orderItems = useSelector(selectOrderItems);
  const [isLogin, setIsLogin] = useState(true);
  const [isActive, setIsActive] = useState("");
  const removeFromCart = useRemoveFromCart();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isInitialization, setIsInitialization] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    setIsInitialization(true);
  }, []);

  useEffect(() => {
    if (!isInitialization) return;

    const setCurrentUser = async () => {
      const currentUser = await getCurrentUser();

      setUser(currentUser);
    };

    setCurrentUser();
  }, [isInitialization]);

  return (
    <>
      <div className="fixed w-full bottom-0 right-0 py-3 z-[12] shadow-custom-shadow container bg-[#FFFDFD] flex items-center justify-between gap-4 lg:hidden">
        <Link
          href="/"
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
          Головна
        </Link>

        <MobileMenu
          setIsLogin={setIsLogin}
          openBtn={
            <div className="p-0 hover:bg-transparent flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium">
              <CatalogIcon />
              Категорії
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
          dialogCancel={t("cart.continueShopping")}
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
              Інформація
            </div>
          }
          setIsActive={setIsActive}
          isActive={isActive ? isActive : "menu"}
          isLogin={isLogin}
        />

        {user ? (
          <Link
            href="/account"
            className="flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium"
          >
            <AccountIcon />
            Акаунт
          </Link>
        ) : (
          <MobileMenu
            setIsLogin={setIsLogin}
            openBtn={
              <div className="p-0 hover:bg-transparent flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium">
                <AccountIcon />
                Акаунт
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
