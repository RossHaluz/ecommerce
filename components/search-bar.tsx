"use client";
import ImageNotFound from "/public/images/image-not-found.jpg";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import SearchIcon from "/public/images/search-icon.svg";
import { Item } from "./header";
import { getSearchProducts } from "@/actions/get-data";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useDispatch } from "react-redux";
import { resetItems } from "@/redux/items/slice";

const SearchBar = () => {
  const [searchedItems, setSearchedItems] = useState<Item[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const texts = useMemo(() => ['Капот Audi Q7 4M', "Крило ліве Audi Q7 4M", "Бампер Audi A6 C7", 'Капот Audi Q5 8R'], []);
  
  const TYPING_SPEED = 100;
  const DELETING_SPEED = 50;
  const PAUSE_AFTER_FULL = 1000;

  const [placeholder, setPlaceholder] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

   const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if(typingTimer.current) clearTimeout(typingTimer.current);
      if(pauseTimer.current) clearTimeout(pauseTimer.current); 
    }
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (typingTimer.current) {
        clearTimeout(typingTimer.current);
        typingTimer.current = null;
      }
      if (pauseTimer.current) {
        clearTimeout(pauseTimer.current);
        pauseTimer.current = null;
      }
      return;
    }

    const currentText = texts[index] ?? "";

    if (!deleting && subIndex === currentText?.length) {
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      pauseTimer.current = setTimeout(() => {
        setDeleting(true);
        pauseTimer.current = null;
      }, PAUSE_AFTER_FULL);

      return;
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts?.length);
      return;
    }

    if (typingTimer.current) clearTimeout(typingTimer.current);

    typingTimer.current = setTimeout(
      () => {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
        typingTimer.current = null;
      },
      deleting ? DELETING_SPEED : TYPING_SPEED
    );
  }, [subIndex, deleting, index, isPaused, texts]);

   useEffect(() => {
     setPlaceholder((texts[index] ?? "").substring(0, subIndex));
   }, [subIndex, index, texts]);

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsideSearch);

    return () => {
      window.removeEventListener("mousedown", clickOutsideSearch);
    };
  }, []);

  useEffect(() => {
    if (!searchValue) {
      setSearchedItems([]);
    }

    const delaySearch = setTimeout(async () => {
      setIsShow(true);
      try {
        const { products } = await getSearchProducts({
          searchValue,
        });

        const formateItems = products?.filter(
          (item: Item, idx: number) => idx < 4
        );

        if (!searchValue) {
          setSearchedItems([]);
          return;
        }

        setSearchedItems(formateItems);
      } catch (error) {
        console.log("Items not found...");
      }
    }, 500);
  }, [searchValue]);

  const onFocuseInput = async () => {
    setIsPaused(true);
    setPlaceholder('')
    setIsFocusInput(true);
    setIsShow(true);
    if (searchValue) {
      const { products } = await getSearchProducts({
        searchValue,
      });

      const formateItems = products?.filter(
        (item: Item, idx: number) => idx < 4
      );

      setSearchedItems(formateItems);
    }
  };

  const handleShowAll = async () => {
    dispatch(resetItems());
    Cookies.set("__search_value", searchValue, { expires: 7, path: "/" });
    const url = qs.stringifyUrl({
      url: "/search",
      query: {
        searchValue,
      },
    });

    setIsShow(false);
    setIsFocusInput(false);
    return router.replace(url);
  };

  const clickOutsideSearch = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setIsShow(false);
    }
  };

  const form = useForm({
    defaultValues: {
      __search_value: "",
    },
  });

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const onSubmit = async (values: { __search_value: string }) => {
       dispatch(resetItems());
    Cookies.set("__search_value", searchValue, {
      expires: 7,
      path: "/",
    });
    const url = qs.stringifyUrl({
      url: "/search",
      query: {
        searchValue: searchValue,
      },
    });

    setIsShow(false);
    setIsFocusInput(false);
   return router.replace(url);
  };

  return (
    <>
      <div className="relative w-full z-20" ref={searchRef}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative w-full"
          >
            <FormField
              name="__search_value"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      aria-label="Пошук товарів"
                      onFocus={onFocuseInput}
                      onBlur={() => {
                        setIsFocusInput(false);
                        setIsPaused(false);
                        setIndex(0);
                        setSubIndex(0);
                        setDeleting(false)
                      }}
                      value={searchValue}
                      onChange={handleSearchValue}
                      className="pr-14 outline-none text-[#111]"
                      placeholder={placeholder}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2 absolute top-0 right-3 h-full">
              <div className="w-[1px] h-[24px] bg-[#B8B6B6]" />
              <Button
                type="submit"
                variant="ghost"
                className="p-0"
                aria-label="Пошук товарів"
              >
                <SearchIcon />
              </Button>
            </div>
          </form>
        </Form>

        {searchValue && isShow && (
          <div className="rounded-[4px] border border-solid shadow-md px-2 py-3 lg:p-4 max-h-80 bg-[#FFFDFD] absolute top-[105%] left-0 w-full flex flex-col gap-4 z-30">
            <div className="overflow-y-auto ">
              {searchedItems?.length > 0 ? (
                searchedItems?.map((item) => {
                  return (
                    <div
                      className="pb-4 border-b border-[#F2F2F2]"
                      key={item?.id}
                    >
                      <Link
                        href={`/product/${item?.product_name}`}
                        onClick={() => setIsShow(false)}
                        className="grid grid-cols-2 md:flex md:items-start gap-3 p-4 hover:shadow-search-shadow transform transition-all duration-300 shadow-none"
                        key={item?.id}
                      >
                        <div className="rounded-md overflow-hidden w-auto h-20 md:w-20  relative">
                          {item?.images[0]?.url ? (
                            <Image
                              src={`${process.env.BACKEND_URL}/products/${item?.images[0]?.url}`}
                              alt={item?.title}
                              fill
                              objectFit="contain"
                              priority
                              unoptimized={true}
                            />
                          ) : (
                            <Image
                              src={ImageNotFound}
                              alt="Image not found"
                              fill
                              objectFit="cover"
                            />
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <h2 className="text-[#484848] font-medium uppercase">
                            {item?.title}
                          </h2>
                          <div className="flex flex-col gap-1">
                            <span className="text-[#111111] text-[10px] leading-[12.19px]">
                              Код товару: {item?.article}
                            </span>
                            <span className="text-[#111111] text-[10px] leading-[12.19px]">
                              Каталожний номер: {item?.catalog_number}
                            </span>
                          </div>

                          <span className="text-[14px] leading-[17.07px] font-medium">
                            {Number(item?.price) === 0 && "Ціна договірна"}
                            {Number(item?.price) > 0 &&
                              USDollar.format(Number(item?.price))}
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <h3 className="text-base text-center text-[#111111]/70">
                  За вашим запитом товарів не знайдено...
                </h3>
              )}
            </div>

            {searchedItems?.length > 0 && (
              <Button
                aria-label="Переглянути усі товари"
                variant="ghost"
                onClick={handleShowAll}
                className="pb-1 rounded-none px-0 pt-0 border-b border-[#111111] max-w-max text-[#111111] font-medium text-[16px] leading-[19.5px]"
              >
                Переглянути усі
              </Button>
            )}
          </div>
        )}
      </div>
      {isFocusInput && (
        <div className="fixed w-full h-full  bg-[#4848484D] top-0 left-0 z-10" />
      )}
    </>
  );
};

export default SearchBar;
