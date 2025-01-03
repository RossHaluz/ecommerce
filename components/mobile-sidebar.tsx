"use client";
import Link from "next/link";
import HomeIcon from "/public/images/home-icon.svg";
import Trash from "/public/images/trash.svg";
import ShopIcon from "/public/images/shop-icon.svg";
import InfoIcon from "/public/images/info-icon.svg";
import AccountIcon from "/public/images/account-icon.svg";
import CatalogIcon from "/public/images/catalog-icon.svg";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import CatalogItems from "./catalog-items";
import { useSelector } from "react-redux";
import { selectCategories } from "@/redux/categories/selectors";
import MobileMenu from "./ui/mobile-menu";
import Image from "next/image";
import Modal from "./ui/modal";
import { selectOrderItems } from "@/redux/order/selector";
import { useAppDispatch } from "@/redux/store";
import { removeItemFromCart } from "@/redux/order/slice";
import ProductCount from "@/app/(routes)/[productId]/_components/product-count";
import { getCurrentUser } from "@/actions/get-data";

const MobileSidebar = () => {
  const pathname = usePathname();
  const [isShowCatalog, setIsShowCatalog] = useState(false);
  const categories = useSelector(selectCategories);
  const orderItems = useSelector(selectOrderItems);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isActive, setIsActive] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isInitialization, setIsInitialization] = useState(false);

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

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return;

    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const hansleDeleteItem = async (id: string) => {
    try {
      dispatch(removeItemFromCart(id));
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <div className="fixed w-full bottom-0 right-0 py-3 z-20 shadow-custom-shadow container bg-[#FFFDFD] flex items-center justify-between gap-4 lg:hidden">
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium",
            {
              "text-[#C0092A]": pathname === "/",
            }
          )}
        >
          <HomeIcon
            className={cn("fill-[#111111]", {
              "fill-[#C0092A]":
                pathname === "/" || pathname.startsWith("/categories"),
            })}
          />
          Головна
        </Link>

        <MobileMenu
          setIsLogin={setIsLogin}
          setIsRegister={setIsRegister}
          openBtn={
            <div className="p-0 hover:bg-transparent flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium">
              <CatalogIcon />
              Категорії
            </div>
          }
          setIsActive={setIsActive}
          isActive={isActive ? isActive : "catalog"}
          isLogin={isLogin}
          isRegister={isRegister}
        />

        <Modal
          triggetBtn={
            <Button
              variant="ghost"
              className="p-0 hover:bg-transparent flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium"
            >
              <ShopIcon />
              Кошик
            </Button>
          }
          title="Кошик"
          dialogCancel={"Продовжити покупки"}
        >
          {orderItems?.length > 0 ? (
            orderItems?.map(
              (item: {
                id: string;
                quantity: number;
                price: number;
                priceForOne: number;
                selectOptions: any[];
                orderItemId: string;
                title: string;
                article: string;
                images: {
                  id: string;
                  url: string;
                }[];
              }) => {
                return (
                  <div
                    className="flex items-start lg:items-center gap-[15px] w-full lg:border lg:border-solid lg:border-[#c0092a] rounded-[5px]"
                    key={item?.orderItemId}
                  >
                    <div className="w-[65px] h-[65px] lg:w-[138px] lg:h-full rounded-[5px] overflow-hidden relative">
                      <Image
                        src={`${process.env.BACKEND_URL}/public/products/${item?.images?.[0]?.url}`}
                        alt={item?.images?.[0]?.id}
                        fill
                        className="object-cover"
                        unoptimized={true}
                      />
                    </div>
                    <div className="flex flex-col gap-[15px] lg:gap-[10px]  w-full lg:py-[10px]">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-2">
                          <h3 className="text-[#484848] text-sm underline w-[167px] lg:w-full">
                            {capitalizeFirstLetter(item?.title)}
                          </h3>
                          {item?.selectOptions?.map(
                            (item: {
                              optionTitle: string;
                              optionValue: string;
                              id: string;
                            }) => {
                              return (
                                <h3
                                  className="text-xs text-foreground"
                                  key={item?.id}
                                >
                                  {item?.optionTitle}: {item?.optionValue}
                                </h3>
                              );
                            }
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => hansleDeleteItem(item?.orderItemId)}
                        >
                          <Trash />
                        </Button>
                      </div>

                      <div className=" flex items-center  justify-between lg:items-start w-full lg:flex-col  lg:gap-[10px] ">
                        <span className="text-lg text-[#c0092a] font-bold">
                          {USDollar.format(Number(item?.price))}
                        </span>
                        <ProductCount
                          count={item?.quantity}
                          itemId={item?.orderItemId}
                          isFromOrder={true}
                          savePrice={item?.priceForOne}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <h3 className="text-[#484848] text-sm">Корзина пуста:(</h3>
            </div>
          )}
        </Modal>

        <MobileMenu
          setIsLogin={setIsLogin}
          setIsRegister={setIsRegister}
          openBtn={
            <div className="p-0 hover:bg-transparent flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium">
              <InfoIcon />
              Інформація
            </div>
          }
          setIsActive={setIsActive}
          isActive={isActive ? isActive : "menu"}
          isLogin={isLogin}
          isRegister={isRegister}
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
            setIsRegister={setIsRegister}
            openBtn={
              <div className="p-0 hover:bg-transparent flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium">
                <AccountIcon />
                Акаунт
              </div>
            }
            setIsActive={setIsActive}
            isActive={isActive ? isActive : "account"}
            isLogin={isLogin}
            isRegister={isRegister}
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
