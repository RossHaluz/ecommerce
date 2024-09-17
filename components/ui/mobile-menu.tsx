"use client";
import { Dispatch, FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { Input } from "./input";

import Menu from "/public/images/menu.svg";
import Logo from "/public/images/logo.svg";
import Search from "/public/images/search.svg";
import Catalog from "/public/images/catalog.svg";
import Arrow from "/public/images/arrow-down.svg";
import Account from "/public/images/account.svg";
import Phone from "/public/images/phone.svg";
import Clock from "/public/images/clock.svg";

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
  setIsActive: React.Dispatch<React.SetStateAction<string>>;
  isActive: string;
}

const MobileMenu: FC<MobileMenuProps> = ({ setIsActive, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchedItems, setSearchedItems] = useState<Item[]>([]);
  const [allItemsSearched, setAllItemSearched] = useState<Item[]>([]);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isShowSearch, setIsShowSearch] = useState(false);
  const token = Cookies.get("token");
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
    if (!isOpen) return;

    const getCategories = async () => {
      const { data } = await axios.get(
        `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/categories`
      );
      setCategories(data);
    };
    getCategories();
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

  const handleSearchValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setSearchValue(e.target.value);
      const { data } = await axios.get(
        `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/products?searchValue=${e.target.value}`
      );

      const formateItems = data?.products?.filter(
        (item: Item, idx: number) => idx < 3
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

  const handleCloseMenu = () => {
    setIsOpen(false);
    setIsActive("menu");
  };

  return (
    <>
      <Button
        variant="ghost"
        className="p-0 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Menu />
      </Button>
      <div
        className={`fixed w-full h-full top-0 left-0 bg-[#F5FAF6] z-50 transform transition-all duration-150 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <div className="px-5 pb-5 flex flex-col gap-[10px]">
          <Logo className="w-[158px] mx-auto" />
          <div className="flex flex-col gap-[15px]">
            <div className="flex items-center justify-between">
              {isActive === "menu" && (
                <h3 className="text-base font-semibold text-[#484848]">Меню</h3>
              )}
              {isActive === "catalog" && (
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent flex items-center gap-5"
                  onClick={() => setIsActive("menu")}
                >
                  <Arrow className="rotate-90" />
                  <span className="text-[#484848] text-base font-semibold">
                    Каталог товарів
                  </span>
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={handleCloseMenu}
                className="p-0 h-0 ml-auto"
              >
                X
              </Button>
            </div>

    
              <div
                className={`flex flex-col gap-[15px] transform transition-all duration-150 ${
                  isActive === "menu" ? "translate-x-0" : "translate-x-[120%] hidden"
                }`}
              >
                <div className="relative">
                  <Input
                    value={searchValue}
                    onChange={handleSearchValue}
                    placeholder="Пошук..."
                    className="bg-[#EAF2EB] rounded-[5px] placeholder:text-[#48484880] w-full border-none outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-[#484848] text-base"
                  />
                  <div className="absolute top-2 right-2 h-full">
                    <Search />
                  </div>
                </div>

                {searchValue && (
                  <>
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

                    <ul className="flex flex-col gap-[15px]">
                      {searchedItems?.map((item) => (
                        <li
                          key={item?.id}
                          className="py-6 px-[15px] rounded-[5px] bg-[#F5FAF6] shadow-search-shadow flex items-center gap-[15px]"
                        >
                          <div className="relative rounded-[5px] w-[65px] h-[65px] overflow-hidden">
                            <Image
                              src={item?.images[0].url}
                              alt={item?.title}
                              objectFit="cover"
                              fill
                            />
                          </div>

                          <div className="flex flex-col gap-[10px]">
                            <Link
                              href={`/${item?.id}`}
                              onClick={() => setIsOpen(false)}
                              className="underline text-[#484848] font-medium w-[171px]"
                            >
                              {item?.title}
                            </Link>

                            <span className="text-[#7FAA84] text-lg font-bold">
                              {item?.price} ₴
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <Button
                  className="bg-[#EAF2EB] rounded-[5px] py-[13px] px-[15px] flex items-center justify-between hover:bg-[#EAF2EB]"
                  onClick={() => setIsActive("catalog")}
                >
                  <div className="flex items-center gap-2">
                    <Catalog className="stroke-[#484848]" />
                    <span className="text-[#484848] text-base font-semibold">
                      Каталог товарів
                    </span>
                  </div>
                  <Arrow className="-rotate-90" />
                </Button>

                <Button className="bg-[#EAF2EB] rounded-[5px] py-[13px] px-[15px] flex items-center justify-start gap-[10px] hover:bg-[#EAF2EB] text-[#484848]" onClick={() => setIsActive("account")}>
                  <Account />
                  Вхід у кабінет
                </Button>

                <div className="bg-[#EAF2EB] rounded-[5px] py-[13px] px-[15px] flex flex-col gap-[30px]">
                  <Link href="/" className="text-base text-[#484848]">
                    Про магазин
                  </Link>
                  <Link href="/" className="text-base text-[#484848]">
                    Відгуки
                  </Link>
                  <Link href="/" className="text-base text-[#484848]">
                    Доставка та оплата
                  </Link>
                  <Link href="/" className="text-base text-[#484848]">
                    Контакти
                  </Link>
                </div>

                <div className="bg-[#EAF2EB] rounded-[5px] py-[13px] px-[15px] flex items-center gap-[10px]">
                  <Phone />
                  <span className="text-base font-semibold text-[#484848]">
                    +38 (096) 400 91 30
                  </span>
                </div>

                <div className="bg-[#EAF2EB] rounded-[5px] py-[13px] px-[15px] flex items-start gap-[10px]">
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
                isActive === "catalog" ? "translate-x-0" : "translate-x-[120%] hidden"
              }`}
            >
              <ul className="flex flex-col gap-[15px]">
                {categories?.map((item: { id: string; name: string }) => {
                  return (
                    <li
                      key={item?.id}
                      className="bg-[#EAF2EB] rounded-[5px] py-[13px] px-[15px]"
                    >
                      <Link
                        href={`/categories/${item?.id}`}
                        className="flex items-center justify-between"
                        onClick={() => setIsOpen(false)}
                      >
                        {item?.name}
                        <Arrow className="-rotate-90" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>


            <div
              className={`transform transition-all duration-150 ${
                isActive === "account" ? "translate-x-0" : "translate-x-[120%] hidden"
              }`}
            ></div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
