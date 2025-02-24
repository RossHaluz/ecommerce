"use client";
import LogoWhite from "/public/images/logo-header.svg";
import ArrowDown from "/public/images/arrow-down.svg";
import PhoneIcon from "/public/images/phone-icon.svg";
import Cart from "/public/images/cart.svg";
import Catalog from "/public/images/catalog.svg";
import Trash from "/public/images/trash.svg";

import { Button } from "./ui/button";
import Link from "next/link";
import Modal from "./ui/modal";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
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
import queryString from "query-string";

export interface Item {
  id: string;
  title: string;
  price: string;
  article: string;
  catalog_number: string;
  product_name: string;
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
  const pathname = usePathname();
  const shouldBeFixed = pathname.includes("/categories");
  const homePage = pathname.endsWith("/");

  const handleClickOutside = (
    ref: React.RefObject<HTMLDivElement>,
    settel: Dispatch<SetStateAction<boolean>>
  ) => {
    return (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        settel(false);
      }
    };
  };

  useEffect(() => {
    const setUser = async () => {
      if (!token) return;
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    setUser();
  }, [token]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleOutsideClick = handleClickOutside(
      numbersRef,
      setIsShowPhoneNumbers
    );
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleOutsideClick = handleClickOutside(infoRef, setIsShowInfo);
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleOutsideClick = handleClickOutside(catelogRef, setIsShowCatelog);
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const goToHomePage = () => {
    const queryParams = queryString.parse(window.location.search);
    const modelId = queryParams?.modelId as string;
    const selectSort = queryParams?.sortByPrice as string;

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          modelId: modelId ? modelId : null,
          sortByPrice: selectSort ? selectSort : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.replace(url);
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
      <header
        className={cn("bg-[#FFFDFD] z-20", {
          "fixed top-0 left-0 w-full": shouldBeFixed || homePage,
        })}
      >
        <div className={cn("bg-[#484848] text-[#FFFDFD]")}>
          <div className="flex items-center gap-4 justify-between container">
            <Button
              aria-label="Логотип audipats"
              size="reset"
              variant="ghost"
              className="hidden lg:block py-3 cursor-pointer"
              onClick={goToHomePage}
            >
              <LogoWhite />
            </Button>

            <div className="relative" ref={catelogRef}>
              <Button
                aria-label="Каталог товарів"
                variant="ghost"
                className="px-6 h-full py-[18px] bg-[#636363] w-[302px] text-[#FFFDFD] text-[16px] leading-[19.5px] font-medium hidden lg:flex items-center justify-between"
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
                  "absolute top-full right-0 border transform transition-all duration-300 scale-y-0 origin-top z-50",
                  {
                    "scale-y-100": isShowCatalog,
                  }
                )}
              >
                <Categories categories={categories} />
              </div>
            </div>

            <Button
              aria-label="Логотип audipats"
              size="reset"
              variant="ghost"
              className="lg:hidden py-3 cursor-pointer"
              onClick={goToHomePage}
            >
              <LogoWhite />
            </Button>
            <SearchBar />

            <div className="lg:flex items-center gap-3 hidden">
              <div className="flex items-center gap-2">
                <PhoneIcon className="stroke-[#FFFDFD]" />
                <div className="relative" ref={numbersRef}>
                  <Button
                    aria-label="Номет телефони"
                    variant="ghost"
                    onClick={() => setIsShowPhoneNumbers((prev) => !prev)}
                    className="p-0 flex items-center gap-2 text-[16px] leading-[19.5px] font-medium"
                  >
                    +38 (067) 383 42 83
                    <ArrowDown
                      className={cn(
                        "stroke-[#FFFDFD] transform transition-all duration-300",
                        {
                          "rotate-180": isShowPhoneNumbers,
                        }
                      )}
                    />
                  </Button>

                  <div
                    className={cn(
                      "bg-[#FFFDFD] rounded-md shadow-md absolute top-full left-0 p-4 origin-top scale-y-0 transform transition-all duration-300 border z-50 w-max flex flex-col gap-4",
                      {
                        "scale-y-100": isShowPhoneNumbers,
                      }
                    )}
                  >
                    <Link
                      href="/"
                      className="text-[#111111] text-[16px] leading-[19.5px]"
                    >
                      +38 (067) 383 42 83 - Ігор
                    </Link>
                    <Link
                      href="/"
                      className="text-[#111111] text-[16px] leading-[19.5px]"
                    >
                      +38 (096) 572 20 60 - Іван
                    </Link>

                    <Link
                      href="/"
                      className="text-[#111111] text-[16px] leading-[19.5px]"
                    >
                      +38 (097) 910 46 59 - Богдан
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="items-center gap-3 hidden lg:flex ">
              {token && currentUser ? (
                <Link href="/account">
                  <User2Icon className="text-[#FFFDFD]" strokeWidth="0.75px" />
                </Link>
              ) : (
                <ModalAuth
                  onOpenChange={onOpenChange}
                  triggetBtn={
                    <Button
                      variant="ghost"
                      className="p-0"
                      aria-label="Кабінет користувача"
                    >
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
                  <Button
                    variant="ghost"
                    className="p-0 relative"
                    aria-label="Додати товар у кошик"
                  >
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
                  <div className="flex flex-col gap-3">
                    {orderItems?.map(
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
                            className="flex items-start gap-3 w-full rounded-[5px]"
                            key={item?.orderItemId}
                          >
                            <div className="w-[65px] h-[65px]  rounded-[5px] overflow-hidden relative">
                              <Image
                                src={`${process.env.BACKEND_URL}/public/products/${item?.images?.[0]?.url}`}
                                alt={item?.images?.[0]?.id}
                                fill
                                className="object-cover"
                                unoptimized={true}
                              />
                            </div>
                            <div className="flex flex-col gap-3  w-full">
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
                                  aria-label="Видалити товар з кошику"
                                  variant="ghost"
                                  size="reset"
                                  onClick={() =>
                                    hansleDeleteItem(item?.orderItemId)
                                  }
                                >
                                  <Trash />
                                </Button>
                              </div>

                              <div className="flex items-center  justify-between lg:items-start w-full lg:flex-col  lg:gap-[10px] ">
                                <span className="text-lg text-[#c0092a] font-bold">
                                  {USDollar.format(Number(item?.price))}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <h3 className="text-[#484848] text-sm">Корзина пуста:(</h3>
                  </div>
                )}
              </Modal>
            </div>
          </div>
        </div>
      </header>
      {isShowCatalog && (
        <div className="bg-[#4848484D] fixed top-0 left-0 w-full h-full z-10" />
      )}
    </>
  );
};

export default Header;
