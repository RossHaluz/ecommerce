"use client";
import Logo from "/public/images/logo.svg";
import Cart from "/public/images/cart.svg";
import Catalog from "/public/images/catalog.svg";
import Phone from "/public/images/phone.svg";
import Search from "/public/images/search.svg";
import Menu from "/public/images/menu.svg";
import MobileMenu from "./ui/mobile-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import MainNavigation from "./main-navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Modal from "./ui/modal";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ProductCount from "@/app/(routes)/[productId]/_components/product-count";
import Image from "next/image";
import { removeItemFromCart } from "@/redux/order/slice";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import Trash from "/public/images/trash.svg";
import { selectOrderItems } from "@/redux/order/selector";
import ModalAuth from "./ui/modal-auth";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import Cookies from "js-cookie";
import { User2Icon } from "lucide-react";
import SearchBar from "./search-bar";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/actions/get-data";
import { selectCategories } from "@/redux/categories/selectors";
import { getCategories } from "@/redux/categories/operetions";
import { useAppDispatch } from "@/hooks/use-dispatch";

export interface Item {
  id: string;
  title: string;
  price: string;
  article: string;
  maxPrice: string;
  productOptions: any[];
  images: {
    id: string;
    url: string;
  }[];
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isActive, setIsActive] = useState("");
  const dispatch = useAppDispatch();
  const orderItems = useSelector(selectOrderItems);
  const router = useRouter();
  const token = Cookies.get("token");
  const categories = useSelector(selectCategories);
  const { categoryId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const setUser = async () => {
      try {
        const user = await getCurrentUser();

        setCurrentUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    setUser();
  }, []);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const searchBtnRef = useRef<HTMLButtonElement>(null);

  const onOpenChange = () => {
    setIsRegister(false);
    setIsLogin(true);
  };

  const hansleDeleteItem = async (id: string) => {
    try {
      dispatch(removeItemFromCart(id));
      router.refresh();
      toast.success("Item success delete");
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <header className="flex flex-col relative">
      <div className="bg-[#F2F2F2] w-full">
        <div className="container flex items-center justify-between h-full">
          <Link href="/" className="flex items-start justify-start py-2">
            <Logo />
          </Link>

          <div className="flex items-center gap-[70px]">
            <a
              href="tel:+380964009130"
              className="lg:flex items-center gap-[10px] text-base font-bold hidden"
            >
              <Phone />
              +38 (096) 400 91 30
            </a>
            <div className="flex items-center gap-5">
              {token && currentUser ? (
                <Link href="/account">
                  <User2Icon className="text-[#c0092a]" strokeWidth="0.75px" />
                </Link>
              ) : (
                <ModalAuth
                  onOpenChange={onOpenChange}
                  triggetBtn={
                    <Button variant="ghost" className="hidden lg:block p-0">
                      <User2Icon
                        className="stroke-[#484848]"
                        strokeWidth="0.75px"
                      />
                    </Button>
                  }
                >
                  {isLogin && (
                    <LoginForm
                      setIsRegister={setIsRegister}
                      setIsLogin={setIsLogin}
                    />
                  )}
                  {isRegister && (
                    <RegisterForm
                      setIsRegister={setIsRegister}
                      setIsLogin={setIsLogin}
                    />
                  )}
                </ModalAuth>
              )}

              <Modal
                triggetBtn={
                  <Button variant="ghost" className="p-0 relative">
                    <Cart />
                    <div className="w-4 h-4 p-[5px] rounded-full bg-[#c0092a] absolute top-5 right-0 flex items-center justify-center">
                      <span className="text-[#FFFFFF] text-xs">
                        {orderItems?.length > 0 ? orderItems?.length : 0}
                      </span>
                    </div>
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
                              src={`${process.env.BACKEND_URL}/products/${item?.images?.[0]?.url}`}
                              alt={item?.images?.[0]?.id}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col gap-[15px] lg:gap-[10px]  w-full lg:py-[10px]">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex flex-col gap-2">
                                <h3 className="text-[#484848] text-sm underline w-[167px] lg:w-full">
                                  {item?.title}
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
                                onClick={() =>
                                  hansleDeleteItem(item?.orderItemId)
                                }
                              >
                                <Trash />
                              </Button>
                            </div>

                            <div className=" flex items-center  justify-between lg:items-start w-full lg:flex-col  lg:gap-[10px] ">
                              <span className="text-lg text-[#c0092a] font-bold">
                                {item?.price} ₴
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
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F2F2F2] lg:bg-[#F2F2F2] lg:border-y">
        <div className="flex items-center justify-between container">
          <div className="hidden lg:block">
            <Popover onOpenChange={(isOpen) => setIsOpen(isOpen)}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex lg:rounded-r-sm items-center gap-[10px] text-[#484848] text-sm py-2 lg:py-[13px] lg:flex-row-reverse  px-0"
                >
                  <Catalog className="stroke-[#484848]" />

                  <span>Каталог товарів</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="z-50 bg-white py-[15px] px-[30px]">
                <ul className="flex flex-col gap-[15px]">
                  {categories?.map((item: { name: string; id: string }) => {
                    return (
                      <li className="flex flex-col gap-[15px]" key={item?.id}>
                        <Link
                          href={`/categories/${item?.id}`}
                          className={cn(
                            "text-[18px] leading-[21.94px] text-[#484848] hover:text-[#7FAA84] hover:underline",
                            {
                              "text-[#7FAA84] underline":
                                item?.id === categoryId,
                            }
                          )}
                        >
                          {item?.name}
                        </Link>
                        <div className="w-full h-[1px] bg-[#7FAA84]" />
                      </li>
                    );
                  })}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
          <div className="lg:hidden">
            <MobileMenu
              setIsLogin={setIsLogin}
              setIsRegister={setIsRegister}
              openBtn={
                <div className="flex items-center gap-2">
                  <Catalog className="stroke-[#484848]" />
                  <span>Каталог товарів</span>
                </div>
              }
              setIsActive={setIsActive}
              isActive={isActive ? isActive : "catalog"}
              isLogin={isLogin}
              isRegister={isRegister}
            />
          </div>

          <MainNavigation />

          <div className="flex lg:hidden">
            <MobileMenu
              setIsActive={setIsActive}
              isActive={isActive ? isActive : "menu"}
              openBtn={<Menu />}
              setIsLogin={setIsLogin}
              setIsRegister={setIsRegister}
              isLogin={isLogin}
              isRegister={isRegister}
            />
          </div>

          <Button
            variant="ghost"
            ref={searchBtnRef}
            className="hidden lg:block  hover:bg-none p-0"
            onClick={() => setIsShowSearch((prev) => !prev)}
          >
            <Search />
          </Button>
        </div>
      </div>

      {isShowSearch && (
        <SearchBar
          setIsShowSearch={setIsShowSearch}
          isShowSearch={isShowSearch}
          searchBtnRef={searchBtnRef}
        />
      )}
    </header>
  );
};

export default Header;
