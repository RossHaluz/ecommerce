"use client";
import Logo from "/public/images/logo.svg";
import Cart from "/public/images/cart.svg";
import Catalog from "/public/images/catalog.svg";
import Account from "/public/images/account.svg";
import Phone from "/public/images/phone.svg";
import Search from "/public/images/search.svg";

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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProductCount from "@/app/(routes)/[productId]/_components/product-count";
import Image from "next/image";
import { removeItemFromCart } from "@/redux/order/slice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Trash from "/public/images/trash.svg";
import { selectOrderItems } from "@/redux/order/selector";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const orderItems = useSelector(selectOrderItems);
  const router = useRouter();

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
    <header className="flex flex-col">
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
              <Button variant="ghost" className="hidden lg:block p-0">
                <Link href="/">
                  <Account />
                </Link>
              </Button>

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
                dialogAction={
                  <Link
                    href="/"
                    className="flex items-center justify-center text-white text-base font-semibold y-[10px]"
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
        <div className="flex items-center justify-between">
          <div className="hidden lg:block">
            <Popover onOpenChange={(isOpen) => setIsOpen(isOpen)}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex hover:bg-[#7FAA84] hover:text-white lg:rounded-r-sm items-center gap-[10px] text-[#484848] text-sm py-2 lg:pr-5 lg:py-[13px] lg:bg-[#7FAA84] lg:flex-row-reverse lg:text-white  lg:pl-[165px] pr-0"
                >
                  <Catalog className="stroke-[#484848] lg:stroke-white" />

                  <span>Каталог товарів</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="z-50 bg-white"></PopoverContent>
            </Popover>
          </div>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex hover:bg-[#7FAA84] hover:text-white lg:rounded-r-sm items-center gap-[10px] text-[#484848] text-sm py-2 lg:pr-5 lg:py-[13px] lg:bg-[#7FAA84] lg:flex-row-reverse lg:text-white  lg:pl-[165px] pr-0"
                >
                  <Catalog className="stroke-[#484848] lg:stroke-white" />

                  <span>Каталог товарів</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <h3 className="text-[#484848] text-base font-semibold">Menu</h3>
              </SheetContent>
            </Sheet>
          </div>

          <MainNavigation />

          <div className="flex lg:hidden  pr-4">
            <MobileMenu />
          </div>

          <Button
            variant="ghost"
            className="hidden lg:block pr-8 lg:pr-[165px] hover:bg-none"
          >
            <Search />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
