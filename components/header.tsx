"use client";
import LogoWhite from "/public/images/logo-header.svg";
import LogoBlack from "/public/images/logo.svg";
import ArrowDown from "/public/images/arrow-down.svg";
import PhoneIcon from "/public/images/phone-icon.svg";
import Cart from "/public/images/cart.svg";
import Catalog from "/public/images/catalog.svg";
import Trash from "/public/images/trash.svg";

import { Button } from "./ui/button";
import Link from "next/link";
import Modal from "./ui/modal";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ProductCount from "@/app/(routes)/[productId]/_components/product-count";
import Image from "next/image";
import { removeItemFromCart } from "@/redux/order/slice";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { selectOrderItems } from "@/redux/order/selector";
import ModalAuth from "./ui/modal-auth";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import Cookies from "js-cookie";
import { User2Icon } from "lucide-react";
import SearchBar from "./search-bar";
import { getCurrentUser } from "@/actions/get-data";
import { selectCategories } from "@/redux/categories/selectors";
import { getCategories } from "@/redux/categories/operetions";
import { useAppDispatch } from "@/hooks/use-dispatch";
import { cn } from "@/lib/utils";
import Categories from "@/app/(routes)/(main)/_components/categories";
import { motion, useScroll, useTransform } from "framer-motion";
import { removeSelectedModel, setModel } from "@/redux/models/slice";

export interface Item {
  id: string;
  title: string;
  price: string;
  article: string;
  catalog_number: string;
  maxPrice: string;
  productOptions: any[];
  images: {
    id: string;
    url: string;
  }[];
}

const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [isShowPhoneNumbers, setIsShowPhoneNumbers] = useState(false);
  const dispatch = useAppDispatch();
  const orderItems = useSelector(selectOrderItems);
  const router = useRouter();
  const token = Cookies.get("token");
  const categories = useSelector(selectCategories);
  const [currentUser, setCurrentUser] = useState(null);
  const [isShowCatalog, setIsShowCatelog] = useState(false);
  const catelogRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const translateY = useTransform(scrollY, [100, 200], [-200, 0]);
  const pathname = usePathname();
  const isShow = pathname.startsWith("/categories") || pathname === "/";

  const isScrolled = useMemo(() => scrollY.get() > 100, [scrollY]);

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsideCatalog);

    () => {
      window.addEventListener("mousedown", clickOutsideCatalog);
    };
  }, []);

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
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsideInfo);

    return () => {
      window.removeEventListener("mousedown", clickOutsideInfo);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsidePhoneNumbers);

    return () => {
      window.removeEventListener("mousedown", clickOutsidePhoneNumbers);
    };
  }, []);

  const goToHomePage = () => {
    dispatch(removeSelectedModel());
    dispatch(setModel(null));
    localStorage.removeItem("currentPage");

    router.push("/");
  };

  const clickOutsidePhoneNumbers = (e: MouseEvent) => {
    if (numbersRef.current && !numbersRef.current.contains(e.target as Node)) {
      setIsShowPhoneNumbers(false);
    }
  };

  const clickOutsideInfo = (e: MouseEvent) => {
    if (infoRef.current && !infoRef.current.contains(e.target as Node)) {
      setIsShowInfo(false);
    }
  };

  const clickOutsideCatalog = (e: MouseEvent) => {
    if (catelogRef.current && !catelogRef.current.contains(e.target as Node)) {
      setIsShowCatelog(false);
    }
  };

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

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <header className="bg-[#FFFDFD] z-20 relative">
        <div className="py-[10px] hidden lg:flex items-center justify-between container">
          <Button
            size="reset"
            variant="ghost"
            onClick={goToHomePage}
            className="cursor-pointer"
          >
            <LogoBlack />
          </Button>

          <div className="flex items-center gap-6">
            <div className="relative" ref={infoRef}>
              <Button
                onClick={() => setIsShowInfo((prev) => !prev)}
                variant="ghost"
                className="p-0 flex items-center gap-2 text-[16px] leading-[19.5px] font-medium text-[#111111]"
              >
                Інформація{" "}
                <ArrowDown
                  className={cn(
                    "stroke-[#111111] transform transition-all duration-300",
                    {
                      "rotate-180": isShowInfo,
                    }
                  )}
                />
              </Button>

              <div
                className={cn(
                  "bg-[#FFFDFD] rounded-md shadow-md absolute top-[90%] right-0 p-4 origin-top scale-y-0 transform transition-all duration-300 border z-50 w-max flex flex-col gap-4",
                  {
                    "scale-y-100": isShowInfo,
                  }
                )}
              >
                <Link
                  href="/contacts"
                  className="text-[#111111] text-[16px] leading-[19.5px]"
                >
                  Контакти
                </Link>
                <Link
                  href="/"
                  className="text-[#111111] text-[16px] leading-[19.5px]"
                >
                  Доставка і оплата
                </Link>
                <Link
                  href="/"
                  className="text-[#111111] text-[16px] leading-[19.5px]"
                >
                  Про нас
                </Link>
              </div>
            </div>

            <div className="h-full w-[1px] bg-[#1111114D]" />

            <div className="flex items-center gap-2">
              <PhoneIcon />
              <div className="relative" ref={numbersRef}>
                <Button
                  variant="ghost"
                  onClick={() => setIsShowPhoneNumbers((prev) => !prev)}
                  className="p-0 flex items-center gap-2 text-[16px] leading-[19.5px] font-medium text-[#111111]"
                >
                  +38 (097) 910 46 96
                  <ArrowDown
                    className={cn(
                      "stroke-[#111111] transform transition-all duration-300",
                      {
                        "rotate-180": isShowPhoneNumbers,
                      }
                    )}
                  />
                </Button>

                <div
                  className={cn(
                    "bg-[#FFFDFD] rounded-md shadow-md absolute top-[90%] right-0 p-4 origin-top scale-y-0 transform transition-all duration-300 border z-50 w-max flex flex-col gap-4",
                    {
                      "scale-y-100": isShowPhoneNumbers,
                    }
                  )}
                >
                  <Link
                    href="/"
                    className="text-[#111111] text-[16px] leading-[19.5px]"
                  >
                    +38 (097) 572 20 60
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cn("bg-[#484848] lg:bg-[#C0092A]")}>
          <div className="flex items-center gap-4 container">
            <div className="relative" ref={catelogRef}>
              <Button
                variant="ghost"
                className="px-6 h-full py-[18px] bg-[#AA0A27] w-[302px] text-[#FFFDFD] text-[16px] leading-[19.5px] font-medium hidden lg:flex items-center justify-between"
                onClick={() => setIsShowCatelog((prev) => !prev)}
              >
                <div className="flex items-center gap-6">
                  <Catalog className="stroke-[#FFFDFD]" />
                  Каталог
                </div>

                <ArrowDown
                  className={cn(
                    "stroke-[#FFFDFD] transform transition-all duration-300 rotate-0",
                    {
                      "rotate-180": isShowCatalog,
                    }
                  )}
                />
              </Button>
              <div
                className={cn(
                  "absolute top-full right-0 border transform transition-all duration-300 scale-y-0 origin-top",
                  {
                    "scale-y-100": isShowCatalog,
                  }
                )}
              >
                <Categories categories={categories} />
              </div>
            </div>
            <Button
              size="reset"
              variant="ghost"
              className="lg:hidden py-3 cursor-pointer"
              onClick={goToHomePage}
            >
              <LogoWhite />
            </Button>
            <SearchBar />

            <div className="items-center gap-5 hidden lg:flex ">
              {token && currentUser ? (
                <Link href="/account">
                  <User2Icon className="text-[#FFFDFD]" strokeWidth="0.75px" />
                </Link>
              ) : (
                <ModalAuth
                  onOpenChange={onOpenChange}
                  triggetBtn={
                    <Button variant="ghost" className="p-0">
                      <User2Icon
                        className="stroke-[#FFFDFD]"
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
                    <Cart className="stroke-[#FFFDFD]" />
                    <div className="w-4 h-4 p-[5px] rounded-full bg-[#FFFDFD] absolute top-5 right-0 flex items-center justify-center">
                      <span className="text-[#C0092A] text-xs">
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
                                onClick={() =>
                                  hansleDeleteItem(item?.orderItemId)
                                }
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
            </div>
          </div>
        </div>
        {/* {isShow && (
          <motion.div
            style={{ translateY }}
            className={cn(
              "bg-[#484848] lg:bg-[#C0092A] fixed top-0 left-0 w-full origin-top transform transition-transform duration-300",
              {
                "scale-y-0": !isScrolled,
                "scale-y-100": isScrolled,
              }
            )}
          >
            <div className="flex items-center gap-4 container">
              <div className="relative" ref={catelogRef}>
                <Button
                  variant="ghost"
                  className="px-6 h-full py-[18px] bg-[#AA0A27] w-[302px] text-[#FFFDFD] text-[16px] leading-[19.5px] font-medium hidden lg:flex items-center justify-between"
                >
                  <div className="flex items-center gap-6">
                    <Catalog className="stroke-[#FFFDFD]" />
                    Каталог
                  </div>

                  <ArrowDown
                    className={cn(
                      "stroke-[#FFFDFD] transform transition-all duration-300"
                    )}
                  />
                </Button>

                <motion.div
                  style={{ translateY }}
                  className={cn(
                    "absolute top-full right-0 border transform transition-all duration-300 scale-y-0 origin-top overscroll-y-auto",
                    {}
                  )}
                >
                  <Categories categories={categories} />
                </motion.div>
              </div>
              <Link href="/" className="lg:hidden py-3">
                <LogoWhite />
              </Link>
              <SearchBar />

              <div className="items-center gap-5 hidden lg:flex ">
                {token && currentUser ? (
                  <Link href="/account">
                    <User2Icon
                      className="text-[#FFFDFD]"
                      strokeWidth="0.75px"
                    />
                  </Link>
                ) : (
                  <ModalAuth
                    onOpenChange={onOpenChange}
                    triggetBtn={
                      <Button variant="ghost" className="p-0">
                        <User2Icon
                          className="stroke-[#FFFDFD]"
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
                      <Cart className="stroke-[#FFFDFD]" />
                      <div className="w-4 h-4 p-[5px] rounded-full bg-[#FFFDFD] absolute top-5 right-0 flex items-center justify-center">
                        <span className="text-[#C0092A] text-xs">
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
                                          {item?.optionTitle}:{" "}
                                          {item?.optionValue}
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
                      <h3 className="text-[#484848] text-sm">
                        Корзина пуста:(
                      </h3>
                    </div>
                  )}
                </Modal>
              </div>
            </div>
          </motion.div>
        )} */}
      </header>
      {isShowCatalog && (
        <div className="bg-[#4848484D] fixed top-0 left-0 w-full h-full z-10" />
      )}
    </>
  );
};

export default Header;

// <header className="flex flex-col fixed top-0 left-0 w-full z-50 shadow-lg">
//   <div className="bg-[#FFFDFD] w-full">
//     <div className="container flex items-center justify-between h-full">
// <Link href="/" className="flex items-start justify-start py-2">
//   <Logo />
// </Link>

//       <div className="flex items-center gap-[70px]">
//         <a
//           href="tel:+380964009130"
//           className="lg:flex items-center gap-[10px] text-base font-bold hidden"
//         >
//           <Phone className="fill-[#484848]" />
//           +38 (096) 400 91 30
//         </a>

//          <div className="flex items-center gap-5">
//           {token && currentUser ? (
//             <Link href="/account">
//               <User2Icon className="text-[#c0092a]" strokeWidth="0.75px" />
//             </Link>
//           ) : (
//             <ModalAuth
//               onOpenChange={onOpenChange}
//               triggetBtn={
//                 <Button variant="ghost" className="hidden lg:block p-0">
//                   <User2Icon
//                     className="stroke-[#484848]"
//                     strokeWidth="0.75px"
//                   />
//                 </Button>
//               }
//             >
//               {isLogin && (
//                 <LoginForm
//                   setIsRegister={setIsRegister}
//                   setIsLogin={setIsLogin}
//                 />
//               )}
//               {isRegister && (
//                 <RegisterForm
//                   setIsRegister={setIsRegister}
//                   setIsLogin={setIsLogin}
//                 />
//               )}
//             </ModalAuth>
//           )}

// <Modal
//   triggetBtn={
//     <Button variant="ghost" className="p-0 relative">
//       <Cart />
//       <div className="w-4 h-4 p-[5px] rounded-full bg-[#c0092a] absolute top-5 right-0 flex items-center justify-center">
//         <span className="text-[#FFFFFF] text-xs">
//           {orderItems?.length > 0 ? orderItems?.length : 0}
//         </span>
//       </div>
//     </Button>
//   }
//   title="Кошик"
//   dialogCancel={"Продовжити покупки"}
// >
//   {orderItems?.length > 0 ? (
//     orderItems?.map(
//       (item: {
//         id: string;
//         quantity: number;
//         price: number;
//         priceForOne: number;
//         selectOptions: any[];
//         orderItemId: string;
//         title: string;
//         article: string;
//         images: {
//           id: string;
//           url: string;
//         }[];
//       }) => {
//         return (
//           <div
//             className="flex items-start lg:items-center gap-[15px] w-full lg:border lg:border-solid lg:border-[#c0092a] rounded-[5px]"
//             key={item?.orderItemId}
//           >
//             <div className="w-[65px] h-[65px] lg:w-[138px] lg:h-full rounded-[5px] overflow-hidden relative">
//               <Image
//                 src={`${process.env.BACKEND_URL}/public/products/${item?.images?.[0]?.url}`}
//                 alt={item?.images?.[0]?.id}
//                 fill
//                 className="object-cover"
//                 unoptimized={true}
//               />
//             </div>
//             <div className="flex flex-col gap-[15px] lg:gap-[10px]  w-full lg:py-[10px]">
//               <div className="flex items-center justify-between w-full">
//                 <div className="flex flex-col gap-2">
//                   <h3 className="text-[#484848] text-sm underline w-[167px] lg:w-full">
//                     {capitalizeFirstLetter(item?.title)}
//                   </h3>
//                   {item?.selectOptions?.map(
//                     (item: {
//                       optionTitle: string;
//                       optionValue: string;
//                       id: string;
//                     }) => {
//                       return (
//                         <h3
//                           className="text-xs text-foreground"
//                           key={item?.id}
//                         >
//                           {item?.optionTitle}: {item?.optionValue}
//                         </h3>
//                       );
//                     }
//                   )}
//                 </div>
//                 <Button
//                   variant="ghost"
//                   onClick={() =>
//                     hansleDeleteItem(item?.orderItemId)
//                   }
//                 >
//                   <Trash />
//                 </Button>
//               </div>

//               <div className=" flex items-center  justify-between lg:items-start w-full lg:flex-col  lg:gap-[10px] ">
//                 <span className="text-lg text-[#c0092a] font-bold">
//                   {USDollar.format(Number(item?.price))}
//                 </span>
//                 <ProductCount
//                   count={item?.quantity}
//                   itemId={item?.orderItemId}
//                   isFromOrder={true}
//                   savePrice={item?.priceForOne}
//                 />
//               </div>
//             </div>
//           </div>
//         );
//       }
//     )
//   ) : (
//     <div className="w-full h-full flex justify-center items-center">
//       <h3 className="text-[#484848] text-sm">Корзина пуста:(</h3>
//     </div>
//   )}
// </Modal>
//         </div>
//       </div>
//     </div>
//   </div>

//   <div className="bg-[#F2F2F2] lg:bg-[#F2F2F2] lg:border-y">
//     <div className="flex items-center justify-between container">
//       <div className="hidden lg:block relative" ref={catelogRef}>
//         <Button
//           className="p-0 flex items-center gap-2"
//           variant="ghost"
//           onClick={() => setIsShowCatelog((prev) => !prev)}
//         >
//           <Catalog className="stroke-[#484848]" />

//           <span>Каталог товарів</span>
//         </Button>

// <div
//   className={`absolute top-[115%]  left-0 z-30 transform transition-opacity duration-300 ${
//     isShowCatalog ? "opacity-1" : "opacity-0 hidden"
//   }`}
// >
//   <CatalogItems
//     categories={categories}
//     setIsShowCatelog={setIsShowCatelog}
//     isShowCatalog={isShowCatalog}
//   />
// </div>
//       </div>
//       <div className="lg:hidden">
// <MobileMenu
//   setIsLogin={setIsLogin}
//   setIsRegister={setIsRegister}
//   openBtn={
//     <div className="flex items-center gap-2">
//       <Catalog className="stroke-[#484848]" />
//       <span>Каталог товарів</span>
//     </div>
//   }
//   setIsActive={setIsActive}
//   isActive={isActive ? isActive : "catalog"}
//   isLogin={isLogin}
//   isRegister={isRegister}
// />
//       </div>

//       <MainNavigation />

//       <div className="flex lg:hidden">
//         <MobileMenu
//           setIsActive={setIsActive}
//           isActive={isActive ? isActive : "menu"}
//           openBtn={<Menu />}
//           setIsLogin={setIsLogin}
//           setIsRegister={setIsRegister}
//           isLogin={isLogin}
//           isRegister={isRegister}
//         />
//       </div>

//       <Button
//         variant="ghost"
//         ref={searchBtnRef}
//         className="hidden lg:block  hover:bg-none p-0"
//         onClick={() => setIsShowSearch((prev) => !prev)}
//       >
//         <Search />
//       </Button>
//     </div>
//   </div>

//   {isShowSearch && (
//     <SearchBar
//       setIsShowSearch={setIsShowSearch}
//       isShowSearch={isShowSearch}
//       searchBtnRef={searchBtnRef}
//     />
//   )}
// </header>
