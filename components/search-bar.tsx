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
import { Search, X } from "lucide-react";
import browserClient from "@/lib/browser-client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { toast } from "react-toastify";

const SearchBar = () => {
  const [searchedItems, setSearchedItems] = useState<
    { id: string; query: string }[] | []
  >([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const texts = useMemo(
    () => ["Капот Q7 4M", "Крило ліве Q7 4M", "Бампер A6 C7", "Капот Q5 8R"],
    []
  );

  const TYPING_SPEED = 100;
  const DELETING_SPEED = 50;
  const PAUSE_AFTER_FULL = 1000;

  const [placeholder, setPlaceholder] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [queries, setQueries] = useState<string[] | []>([]);
  const [popularQueries, setPopularQueries] = useState([]);

  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimer.current) clearTimeout(typingTimer.current);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!isFocusInput) return;
    try {
      const stored = localStorage.getItem("searchQueries");
      const parsed: string[] | [] = stored ? JSON.parse(stored) : [];
      setQueries(Array.isArray(parsed) ? parsed.slice(0, 10) : []);
    } catch (error) {
      console.error("Помилка при парсі JSON:", error);
      setQueries([]);
      localStorage.removeItem("searchQueries");
    }
  }, [isFocusInput]);

  useEffect(() => {
    const getPopularQueries = async () => {
      try {
        const { data } = await browserClient.get(ENDPOINTS.searchPopular());
        setPopularQueries(data);
      } catch (error) {
        console.log(error);
        toast.error("Упс, щось сталось...");
      }
    };

    getPopularQueries();
  }, []);

 useEffect(() => {
   if (!isFocusInput) return;
   if (!searchValue){
    setSearchedItems([]);
    return;
   }

     const delay = setTimeout(async () => {
       try {
         const { data } = await browserClient.get(ENDPOINTS.searchSuggestions(), {
           params: { query: searchValue },
         });
         setSearchedItems(data);
       } catch (error) {
         console.log(error);
         toast.error("Упс, щось сталось...");
       }
     }, 1000);

   return () => clearTimeout(delay);

 }, [searchValue, isFocusInput]);


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

  // useEffect(() => {
  //   if (!searchValue) return;

  //   const delaySearch = setTimeout(async () => {
  //     setIsShow(true);
  //     try {
        // const { data } = await browserClient.get(
        //   `/api/search/suggestions?query=${searchValue}`
        // );

  //       setSearchedItems(data);
  //     } catch (error) {
  //       console.log("Items not found...");
  //     }
  //   }, 1000);

  //   return () => {
  //     clearTimeout(delaySearch);
  //   };
  // }, [searchValue]);

  const onFocuseInput = async () => {
    setIsPaused(true);
    setPlaceholder("");
    setIsFocusInput(true);
    setIsShow(true);
    if (searchValue) {
             const { data } = await browserClient.get(ENDPOINTS.searchSuggestions(), {
               params: { query: searchValue },
             })

      setSearchedItems(data);
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

  const handeRemoveAllQueries = () => {
    localStorage.removeItem("searchQueries");
    setQueries([]);
    router.refresh();
  };

  const handleRemoveQuery = (query: string) => {
    const queries: string[] = JSON.parse(
      localStorage.getItem("searchQueries") ?? "[]"
    );
    const updateueries = queries?.filter((item) => item !== query);
    setQueries((prev) => prev?.filter((item) => item !== query));

    localStorage.setItem("searchQueries", JSON.stringify(updateueries));
    router.refresh();
  };

  const handleSelectQuery = async (query: string) => {
    try {
      dispatch(resetItems());
      Cookies.set("__search_value", query, {
        expires: 7,
        path: "/",
      });
      const url = qs.stringifyUrl({
        url: "/search",
        query: {
          searchValue: query,
        },
      });

      const queries: string[] = JSON.parse(
        localStorage.getItem("searchQueries") ?? "[]"
      );

      const existing = queries.find((item) => item === query);

      if (typeof query === "string") {
        if (queries?.length > 0 && !existing) queries.unshift(query);
        if (queries?.length === 0) queries.unshift(query);
      }

      localStorage.setItem("searchQueries", JSON.stringify(queries));
      await browserClient.post(ENDPOINTS.search(), { query });

      setIsShow(false);
      setIsFocusInput(false);
      return router.replace(url);
    } catch (error) {
      console.log(error);
      toast.error("Упс, щось сталось...");
    }
  };

  // const USDollar = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  const onSubmit = async (values: { __search_value: string }) => {
    try {
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

      const queries: string[] = JSON.parse(
        localStorage.getItem("searchQueries") ?? "[]"
      );

      const existing = queries.find((item) => item === searchValue);

      if (typeof searchValue === "string" && !existing)
        queries.push(searchValue);

      localStorage.setItem("searchQueries", JSON.stringify(queries));
      await browserClient.post(ENDPOINTS.search(), { query: searchValue });
      setIsShow(false);
      setIsFocusInput(false);
      return router.replace(url);
    } catch (error) {
      console.log(error);
      toast.error("Упс, щось сталось...");
    }
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
                        setDeleting(false);
                      }}
                      value={searchValue}
                      onChange={handleSearchValue}
                      className="pr-14 text-lg outline-none text-[#111]"
                      placeholder={placeholder}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
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

        {isFocusInput && (
          <>
            <div className="rounded-[4px] border border-solid shadow-md px-2 py-3 lg:p-4 max-h-80 overflow-y-auto bg-[#FFFDFD] absolute top-[105%] left-0 w-full flex flex-col gap-4 z-30">
              {/* {searchValue && (
                <div className="overflow-y-auto h-full">
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
              )}
              {searchedItems?.length > 0 && (
                <Button
                  aria-label="Переглянути усі товари"
                  variant="ghost"
                  onClick={handleShowAll}
                  className="pb-1 rounded-none px-0 pt-0 border-b border-[#111111] max-w-max text-[#111111] font-medium text-[16px] leading-[19.5px]"
                >
                  Переглянути усі
                </Button>
              )} */}

              {searchedItems?.length > 0 && (
                <div className="flex flex-col gap-3">
                  {searchedItems?.map((item) => {
                    return (
                      <Button
                        type="button"
                        className="text-gray-500 p-0 max-w-max"
                        key={item?.id}
                        variant="ghost"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSearchValue(item?.query);
                          form.setValue("__search_value", item?.query);
                          handleSelectQuery(item?.query);
                        }}
                      >
                        {item?.query}
                      </Button>
                    );
                  })}
                </div>
              )}

              {popularQueries?.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-medium text-[#111]">Популярні запити</h3>
                  <div className="flex flex-wrap gap-3 overflow-hidden">
                    {popularQueries?.map(
                      (item: { query: string; id: string }) => {
                        return (
                          <Button
                            type="button"
                            variant="outline"
                            className="hover:border-[#c0092a] underline text-[#111] p-2 h-auto"
                            key={item?.id}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setSearchValue(item?.query);
                              form.setValue("__search_value", item?.query);
                              handleSelectQuery(item?.query);
                            }}
                          >
                            {item?.query}
                          </Button>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              {queries && queries?.length > 0 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-[#111]">Історія пошуку</h3>
                    <Button
                      type="button"
                      className="p-0 text-[#111]"
                      variant="ghost"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handeRemoveAllQueries();
                      }}
                    >
                      Очистити
                    </Button>
                  </div>

                  {queries?.map((item) => (
                    <div
                      className="flex items-center justify-between"
                      key={item}
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        className="flex items-center gap-3 text-[#111] hover:text-[#c0092a] hover:underline p-0"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSearchValue(item);
                          form.setValue("__search_value", item);
                          handleSelectQuery(item);
                        }}
                      >
                        <Search color="#484848" />
                        {item}
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        className="text-[#111]"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleRemoveQuery(item);
                        }}
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {isFocusInput && (
        <div className="fixed w-full h-full  bg-[#4848484D] top-0 left-0 z-10" />
      )}
    </>
  );
};

export default SearchBar;
