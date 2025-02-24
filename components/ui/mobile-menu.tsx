"use client";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { Button } from "./button";
import Cookies from "js-cookie";

import Logo from "/public/images/logo.svg";
import Catalog from "/public/images/catalog.svg";
import Arrow from "/public/images/arrow-down.svg";
import Account from "/public/images/account.svg";
import Phone from "/public/images/phone.svg";
import Clock from "/public/images/clock.svg";
import { useRouter } from "next/navigation";
import LoginForm from "../login-form";
import RegisterForm from "../register-form";
import { User2Icon } from "lucide-react";
import { getCategories, getCurrentUser } from "@/actions/get-data";
import RenderCategoryItems from "../render-category-items";
import { cn } from "@/lib/utils";
import ArrowDown from "/public/images/arrow-down.svg";

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

interface MobileMenuProps {
  setIsRegister: Dispatch<SetStateAction<boolean>>;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  isRegister?: boolean;
  isLogin?: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<string>>;
  isActive: string;
  openBtn: React.ReactNode;
}

const MobileMenu: FC<MobileMenuProps> = ({
  setIsActive,
  isActive,
  openBtn,
  setIsRegister,
  setIsLogin,
  isRegister,
  isLogin,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchedItems, setSearchedItems] = useState<Item[]>([]);
  const [allItemsSearched, setAllItemSearched] = useState<Item[]>([]);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isShowSearch, setIsShowSearch] = useState(false);
  const inputContainerRef = useRef<HTMLInputElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [isInitialization, setIsInitialization] = useState(false);
  const [isShowPhoneNumbers, setIsShowPhoneNumbers] = useState(false);
  const numbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsidePhoneNumbers);

    return () => {
      window.removeEventListener("mousedown", clickOutsidePhoneNumbers);
    };
  }, []);

  const clickOutsidePhoneNumbers = (e: MouseEvent) => {
    if (numbersRef.current && !numbersRef.current.contains(e.target as Node)) {
      setIsShowPhoneNumbers(false);
    }
  };

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
    if (!isOpen) return;

    const setAllCategories = async () => {
      const categories = (await getCategories()) || [];
      setCategories(categories);
    };
    setAllCategories();
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsideInput);

    () => {
      window.removeEventListener("mousedown", clickOutsideInput);
    };
  }, []);

  useEffect(() => {
    Cookies.set("searchValue", searchValue);
  }, [searchValue]);

  const handleCloseMenu = () => {
    setIsOpen(false);
    setIsActive("");
    setIsRegister(false);
    setIsLogin(true);
    router.refresh();
  };

  return (
    <>
      <Button
        variant="ghost"
        className="p-0 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {openBtn}
      </Button>
      <div
        className={`fixed w-full h-screen top-0 left-0 bg-white overflow-hidden z-[100] transform transition-all duration-150 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <div className="px-5 pb-2 flex flex-col gap-[10px]">
          <div className="p-4">
            <Logo className="w-[158px] mx-auto" />
          </div>
          <div className="flex flex-col gap-[15px]">
            <div
              className={`flex items-center justify-between ${
                isActive === "account" && "flex-col gap-[15px]"
              }`}
            >
              {isActive === "menu" && (
                <h3 className="text-base font-semibold text-[#484848]">Меню</h3>
              )}
              {isActive === "catalog" && (
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent flex items-center gap-5"
                  onClick={() => setIsActive("menu")}
                >
                  <Arrow className="rotate-90 stroke-[#484848]" />
                  <span className="text-[#484848] text-base font-semibold">
                    Каталог товарів
                  </span>
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={handleCloseMenu}
                className="p-0 ml-auto h-auto"
              >
                X
              </Button>
              {isActive === "account" && isLogin && (
                <h3 className="text-base font-semibold text-[#484848]">
                  Вхід до особистого кабінету
                </h3>
              )}

              {isActive === "account" && isRegister && (
                <h3 className="text-base font-semibold text-[#484848]">
                  Реєстрація особистого кабінету
                </h3>
              )}
            </div>

            <div
              className={`flex flex-col gap-[15px] transform transition-all duration-150 ${
                isActive === "menu" ? "translate-x-0" : "translate-x-[120%] h-0"
              }`}
            >
              <Button
                className="bg-[#F2F2F2] rounded-[5px] p-4 h-auto flex items-center justify-between hover:bg-[#F2F2F2]"
                onClick={() => setIsActive("catalog")}
              >
                <div className="flex items-center gap-2">
                  <Catalog className="stroke-[#484848]" />
                  <span className="text-[#484848] text-base font-semibold">
                    Каталог товарів
                  </span>
                </div>
                <Arrow className="-rotate-90 stroke-[#484848]" />
              </Button>

              {user && user?.role === "user" ? (
                <div className="bg-[#F2F2F2] rounded-[5px] p-4 flex items-center justify-start gap-[10px] hover:bg-[#F2F2F2] text-[#484848]">
                  <User2Icon className="text-[#c0092a]" strokeWidth="0.75px" />{" "}
                  <Link href="/account" onClick={() => setIsOpen(false)}>
                    Перейти у кабінет
                  </Link>
                </div>
              ) : (
                <Button
                  className="bg-[#F2F2F2] rounded-[5px] p-4 h-auto flex items-center justify-start gap-[10px] hover:bg-[#F2F2F2] text-[#484848]"
                  onClick={() => setIsActive("account")}
                >
                  <Account />
                  Вхід у кабінет
                </Button>
              )}

              <div className="bg-[#F2F2F2] rounded-[5px] py-[13px] px-[15px] flex flex-col gap-[30px]">
                <Link href="/" className="text-base text-[#484848]">
                  Про магазин
                </Link>
                <Link href="/" className="text-base text-[#484848]">
                  Доставка та оплата
                </Link>
                <Link href="/contacts" className="text-base text-[#484848]">
                  Контакти
                </Link>
              </div>

              <div className="bg-[#F2F2F2] rounded-[5px] py-[13px] px-[15px] flex items-center gap-2">
                <Phone className="stroke-[#484848]" />
                <div className="relative" ref={numbersRef}>
                  <Button
                    variant="ghost"
                    onClick={() => setIsShowPhoneNumbers((prev) => !prev)}
                    className="p-0 flex items-center gap-2 text-[16px] leading-[19.5px] font-medium"
                  >
                    +38 (067) 383 42 83
                    <ArrowDown
                      className={cn(
                        "stroke-[#484848] transform transition-all duration-300",
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
                      href="tel:+380673834283"
                      className="text-[#111111] text-[16px] leading-[19.5px]"
                    >
                      +38 (067) 383 42 83 - Ігор
                    </Link>
                    <Link
                      href="tel:+380965722060"
                      className="text-[#111111] text-[16px] leading-[19.5px]"
                    >
                      +38 (096) 572 20 60 - Іван
                    </Link>

                    <Link
                      href="tel:+380979104659"
                      className="text-[#111111] text-[16px] leading-[19.5px]"
                    >
                      +38 (097) 910 46 59 - Богдан
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-[#F2F2F2] rounded-[5px] py-[13px] px-[15px] flex items-start gap-[10px]">
                <Clock />
                <div className="flex flex-col gap-[15px]">
                  <span className="text-base text-[#484848]">
                    Пн-Пт: 10:00 - 19:00
                  </span>
                  <span className="text-base text-[#484848]">
                    Сб-Нд: вихідний
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`transform transition-all duration-150 ${
                isActive === "catalog"
                  ? "translate-x-0"
                  : "translate-x-[120%] h-0"
              }`}
            >
              <RenderCategoryItems
                categories={categories}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              />
            </div>

            <div
              className={`transform transition-all duration-150 ${
                isActive === "account"
                  ? "translate-x-0"
                  : "translate-x-[120%] h-0"
              }`}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
