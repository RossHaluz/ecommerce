"use client";
import Logo from "/public/images/logo.svg";
import Cart from "/public/images/cart.svg";
import Catalog from "/public/images/catalog.svg";
import Phone from "/public/images/phone.svg";
import Search from "/public/images/search.svg";
import Cross from "/public/images/cross.svg";
import Available from "/public/images/available.svg";
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
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Modal from "./ui/modal";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProductCount from "@/app/(routes)/[productId]/_components/product-count";
import Image from "next/image";
import { removeItemFromCart } from "@/redux/order/slice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Trash from "/public/images/trash.svg";
import { selectOrderItems } from "@/redux/order/selector";
import ModalAuth from "./ui/modal-auth";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import Cookies from "js-cookie";
import { User2Icon } from "lucide-react";
import { Input } from "./ui/input";
import axios from "axios";

interface Item {
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
  const [searchedItems, setSearchedItems] = useState<Item[]>([]);
  const [allItemsSearched, setAllItemSearched] = useState<Item[]>([]);
  const [isActive, setIsActive] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const orderItems = useSelector(selectOrderItems);
  const router = useRouter();
  const token = Cookies.get("token");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef<HTMLInputElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);

  const clickOutsideInput = (e: MouseEvent) => {
    if (
      inputContainerRef.current &&
      !inputContainerRef.current.contains(e.target as Node) &&
      searchBtnRef.current &&
      !searchBtnRef.current.contains(e.target as Node)
    ) {
      setIsShowSearch(false);
      setSearchedItems([]);
      setAllItemSearched([]);
      setSearchValue("");
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsideInput);

    () => {
      window.removeEventListener("mousedown", clickOutsideInput);
    };
  }, []);

  useEffect(() => {
    if (isShowSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowSearch]);

  useEffect(() => {
    Cookies.set("searchValue", searchValue);
  }, [searchValue]);

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

  const handleSearchValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setSearchValue(e.target.value);
      const { data } = await axios.get(
        `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/products?searchValue=${e.target.value}`
      );

      const formateItems = data?.products?.filter(
        (item: Item, idx: number) => idx < 4
      );

      if (!e.target.value) {
        setSearchedItems([]);
        setAllItemSearched([]);
        return;
      }

      setAllItemSearched(data?.products);
      setSearchedItems(formateItems);
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  const removeInputValue = () => {
    setSearchValue("");
    setSearchedItems([]);
    setAllItemSearched([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <header className="flex flex-col relative">
      <div className="bg-[#EAF2EB] w-full">
        <div className="container flex items-center justify-between h-full">
          <Link href="/">
            <Logo className="w-[159px] h-[50px] lg:w-[255px] lg:h-20" />
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
              {token ? (
                <Link href="/account">
                  <User2Icon className="text-[#7FAA84]" strokeWidth="0.75px" />
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
                    <div className="w-4 h-4 p-[5px] rounded-full bg-[#7FAA84] absolute top-5 right-0 flex items-center justify-center">
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
                          className="flex items-start lg:items-center gap-[15px] w-full lg:border lg:border-solid lg:border-[#7FAA84] rounded-[5px]"
                          key={item?.orderItemId}
                        >
                          <div className="w-[65px] h-[65px] lg:w-[138px] lg:h-full rounded-[5px] overflow-hidden relative">
                            <Image
                              src={item?.images?.[0]?.url}
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
                              <span className="text-lg text-[#7FAA84] font-bold">
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

      <div className="bg-[#F5FAF6] lg:bg-[#EAF2EB] lg:border-y">
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
              <PopoverContent className="z-50 bg-white"></PopoverContent>
            </Popover>
          </div>
          <div className="lg:hidden">
            <MobileMenu
              openBtn={
                <div className="flex items-center gap-2">
                  <Catalog className="stroke-[#484848]" />
                  <span>Каталог товарів</span>
                </div>
              }
              setIsActive={setIsActive}
              isActive={isActive ? isActive : 'catalog'}
              
            />
          </div>

          <MainNavigation />

          <div className="flex lg:hidden">
            <MobileMenu
              setIsActive={setIsActive}
              isActive={isActive ? isActive : 'menu'}
              openBtn={<Menu />}
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
        <div
          ref={inputContainerRef}
          className="w-full bg-[#F5FAF6] absolute top-full left-0 z-50"
        >
          <div className="border-b border-[#4848481A]">
            <div className=" container">
              <div className="relative">
                <Input
                  ref={inputRef}
                  value={searchValue}
                  onChange={handleSearchValue}
                  className="bg-transparent w-full border-none pl-[30px] outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-[#484848] text-base font-medium"
                />
                <div className="absolute top-2 left-0 h-full">
                  <Search />
                </div>

                {searchValue && (
                  <Button
                    variant="ghost"
                    className="absolute top-0 right-0 px-0"
                    onClick={removeInputValue}
                  >
                    <Cross />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="pt-[30px] pb-[39px] bg-[#F5FAF6] shadow-custom-shadow">
            <div className="container flex flex-col gap-[30px]">
              <div className="flex items-center justify-between">
                <span className="text-base text-[#484848CC]">
                  {allItemsSearched?.length} результатів
                </span>

                <Button
                  variant="ghost"
                  className="p-0 text-base text-[#484848] underline font-bold"
                >
                  <Link href="/search">Подивитись все</Link>
                </Button>
              </div>

              <div className="w-full h-[1px] bg-[#7FAA84]" />

              {searchedItems?.length > 0 ? (
                <ul className="grid grid-cols-4 gap-[30px]">
                  {searchedItems?.map((item) => {
                    return (
                      <li
                        className="rounded-[5px] border border-[rgba(72,72,72,0.2)] overflow-hidden"
                        key={item?.id}
                      >
                        <div className="flex flex-col">
                          <Link
                            href={`/${item?.id}`}
                            className="w-full h-[253px] relative overflow-hidden"
                          >
                            <Image
                              src={item?.images[0].url}
                              alt={item?.title}
                              fill
                              className="absolute top-0 left-0 object-cover"
                            />
                          </Link>

                          <div className="px-[14px] py-5">
                            <div className="flex flex-col gap-[25px]">
                              <div className="flex flex-col gap-[15px]">
                                <Link href={`/${item?.id}`}>
                                  <h2 className="font-bold text-base">
                                    {item?.title}
                                  </h2>
                                </Link>
                                <div className="flex flex-col gap-[13px]">
                                  <div className="flex items-center gap-[6px]">
                                    <Available />
                                    <span className="text-[#7FAA84] text-xs font-medium">
                                      В наявності
                                    </span>
                                  </div>

                                  <span className="text-[#484848] text-xs">
                                    Артикул: {item?.article}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-[#7FAA84] font-bold text-base">
                                  {item?.price} ₴
                                </span>
                                {/* <Modal
                              triggetBtn={
                                <Button
                                  variant="ghost"
                                  className="hover:bg-none p-0"
                                  onClick={() => handleAddItemToCart(item)}
                                >
                                  <Bag />
                                </Button>
                              }
                              title="Товар доданий до Вашого кошика!"
                              dialogCancel={"Продовжити покупки"}
                              dialogAction={
                                <Link
                                  href="/"
                                  className="flex items-center justify-center text-white text-base font-semibold px-[25.5px] py-[10px]"
                                >
                                  Оформити замовлення
                                </Link>
                              }
                            >
                              {orderItems?.length > 0 ? (
                                orderItems?.map(
                                  (item: {
                                    id: string;
                                    quantity: number;
                                    price: number;
                                    priceForOne: number;
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
                                        className="flex items-start lg:items-center gap-[15px] w-full lg:border lg:border-solid lg:border-[#7FAA84] rounded-[5px]"
                                        key={item?.orderItemId}
                                      >
                                        <div className="w-[65px] h-[65px] lg:w-[138px] lg:h-full rounded-[5px] overflow-hidden relative">
                                          <Image
                                            src={item?.images[0]?.url}
                                            alt={item?.images[0]?.id}
                                            fill
                                            className="object-cover"
                                          />
                                        </div>
                                        <div className="flex flex-col gap-[15px] lg:gap-[10px]  w-full lg:py-[10px]">
                                          <div className="flex items-center justify-between w-full">
                                            <h3 className="text-[#484848] text-sm underline w-[167px] lg:w-full">
                                              {item?.title}
                                            </h3>
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
                                            <span className="text-lg text-[#7FAA84] font-bold">
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
                            </Modal> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <h3 className="text-base text-foreground">
                    За вашим запитом товарів не знайдено...
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
