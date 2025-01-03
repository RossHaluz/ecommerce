"use client";
// import Search from "/public/images/search.svg";
// import Cross from "/public/images/cross.svg";
// import Available from "/public/images/available.svg";

// import React, {
//   Dispatch,
//   FC,
//   SetStateAction,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { Input } from "./ui/input";
// import { Item } from "./header";
// import { Button } from "./ui/button";
// import Link from "next/link";
// import Cookies from "js-cookie";
// import Image from "next/image";
// import { getSearchProducts } from "@/actions/get-data";
// import qs from "query-string";
// import { useRouter } from "next/navigation";

// const SearchBar = () => {
// const [searchedItems, setSearchedItems] = useState<Item[]>([]);
// const [allItemsSearched, setAllItemSearched] = useState<Item[]>([]);
// const [searchValue, setSearchValue] = useState("");
//   const router = useRouter();

//   const inputRef = useRef<HTMLInputElement>(null);
//   const inputContainerRef = useRef<HTMLInputElement>(null);

//   const clickOutsideInput = (e: MouseEvent) => {
//     if (
//       inputContainerRef.current &&
//       !inputContainerRef.current.contains(e.target as Node)
//     ) {
//       setSearchedItems([]);
//       setAllItemSearched([]);
//       setSearchValue("");
//     }
//   };

//   const handleSearchValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     try {
//       setSearchValue(e.target.value);
//       const { products } = await getSearchProducts({
//         searchValue: e.target.value,
//       });

//       const formateItems = products?.filter(
//         (item: Item, idx: number) => idx < 4
//       );

//       if (!e.target.value) {
//         setSearchedItems([]);
//         setAllItemSearched([]);
//         return;
//       }

//       setAllItemSearched(products);
//       setSearchedItems(formateItems);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const removeInputValue = () => {
//     setSearchValue("");
//     localStorage.removeItem("searchValue");
//     setSearchedItems([]);
//     setAllItemSearched([]);
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   };

// const handleShowAll = () => {
//   Cookies.set("__search_value", searchValue, { expires: 7, path: "/" });
//   const url = qs.stringifyUrl({
//     url: "/search",
//     query: {
//       searchValue,
//     },
//   });

//   return router.push(url);
// };

//   useEffect(() => {
//     window.addEventListener("mousedown", clickOutsideInput);

//     () => {
//       window.removeEventListener("mousedown", clickOutsideInput);
//     };
//   }, []);

//   const capitalizeFirstLetter = (str: string) => {
//     if (!str) return "";
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   };

//   const USDollar = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   });

//   return (
//     <div
//       ref={inputContainerRef}
//       className="w-full bg-[#F2F2F2] absolute top-full left-0 z-50"
//     >
//       <div className="border-b border-[#4848481A]">
//         <div className=" container">
//           <div className="relative">
//             <Input
//               ref={inputRef}
//               value={searchValue}
//               onChange={handleSearchValue}
//               className="bg-transparent w-full border-none pl-[30px] outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-[#484848] text-base font-medium"
//             />
//             <div className="absolute top-2 left-0 h-full">
//               <Search />
//             </div>

//             {searchValue && (
//               <Button
//                 variant="ghost"
//                 className="absolute top-0 right-0 px-0"
//                 onClick={removeInputValue}
//               >
//                 <Cross />
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="pt-[30px] pb-[39px] bg-[#F2F2F2] shadow-md">
//         <div className="container flex flex-col gap-[30px]">
//           <div className="flex items-center justify-between">
//             <span className="text-base text-[#484848CC]">
//               {allItemsSearched?.length} результатів
//             </span>

//             <Button
//               variant="ghost"
//               className="p-0 text-base text-[#484848] underline font-bold"
//             >
//               <Button
//                 type="button"
//                 className="p-0"
//                 variant="ghost"
//                 onClick={handleShowAll}
//               >
//                 Подивитись все
//               </Button>
//             </Button>
//           </div>

//           <div className="w-full h-[1px] bg-[#c0092a]" />

//           {searchedItems?.length > 0 ? (
//             <ul className="grid grid-cols-4 gap-[30px]">
//               {searchedItems?.map((item) => {
//                 return (
//                   <li
//                     className="rounded-[5px] border border-[rgba(72,72,72,0.2)] overflow-hidden"
//                     key={item?.id}
//                   >
//                     <div className="flex flex-col">
//                       <Link
//                         href={`/${item?.id}`}
//                         className="w-full h-[253px] relative overflow-hidden"
//                       >
//                         <Image
//                           src={`${process.env.BACKEND_URL}/public/products/${item?.images[0].url}`}
//                           alt={item?.title}
//                           fill
//                           className="absolute top-0 left-0 object-cover"
//                           unoptimized={true}
//                         />
//                       </Link>

//                       <div className="px-[14px] py-5">
//                         <div className="flex flex-col gap-[25px]">
//                           <div className="flex flex-col gap-[15px]">
//                             <Link href={`/${item?.id}`}>
//                               <h2 className="font-bold text-base">
//                                 {capitalizeFirstLetter(item?.title)}
//                               </h2>
//                             </Link>
//                             <div className="flex flex-col gap-[13px]">
//                               <div className="flex items-center gap-[6px]">
//                                 <Available className="stroke-[#c0092a]" />
//                                 <span className="text-[#c0092a] text-xs font-medium">
//                                   В наявності
//                                 </span>
//                               </div>

//                               <span className="text-[#484848] text-xs">
//                                 Артикул: {item?.article}
//                               </span>
//                             </div>
//                           </div>

//                           <div className="flex items-center justify-between">
//                             <span className="text-[#c0092a] font-bold text-base">
//                               {USDollar.format(Number(item?.price))}
//                             </span>
//                             {/* <Modal
//                         triggetBtn={
//                           <Button
//                             variant="ghost"
//                             className="hover:bg-none p-0"
//                             onClick={() => handleAddItemToCart(item)}
//                           >
//                             <Bag />
//                           </Button>
//                         }
//                         title="Товар доданий до Вашого кошика!"
//                         dialogCancel={"Продовжити покупки"}
//                         dialogAction={
//                           <Link
//                             href="/"
//                             className="flex items-center justify-center text-white text-base font-semibold px-[25.5px] py-[10px]"
//                           >
//                             Оформити замовлення
//                           </Link>
//                         }
//                       >
//                         {orderItems?.length > 0 ? (
//                           orderItems?.map(
//                             (item: {
//                               id: string;
//                               quantity: number;
//                               price: number;
//                               priceForOne: number;
//                               orderItemId: string;
//                               title: string;
//                               article: string;
//                               images: {
//                                 id: string;
//                                 url: string;
//                               }[];
//                             }) => {
//                               return (
//                                 <div
//                                   className="flex items-start lg:items-center gap-[15px] w-full lg:border lg:border-solid lg:border-[#7FAA84] rounded-[5px]"
//                                   key={item?.orderItemId}
//                                 >
//                                   <div className="w-[65px] h-[65px] lg:w-[138px] lg:h-full rounded-[5px] overflow-hidden relative">
//                                     <Image
//                                       src={item?.images[0]?.url}
//                                       alt={item?.images[0]?.id}
//                                       fill
//                                       className="object-cover"
//                                     />
//                                   </div>
//                                   <div className="flex flex-col gap-[15px] lg:gap-[10px]  w-full lg:py-[10px]">
//                                     <div className="flex items-center justify-between w-full">
//                                       <h3 className="text-[#484848] text-sm underline w-[167px] lg:w-full">
//                                         {item?.title}
//                                       </h3>
//                                       <Button
//                                         variant="ghost"
//                                         onClick={() =>
//                                           hansleDeleteItem(item?.orderItemId)
//                                         }
//                                       >
//                                         <Trash />
//                                       </Button>
//                                     </div>

//                                     <div className=" flex items-center  justify-between lg:items-start w-full lg:flex-col  lg:gap-[10px] ">
//                                       <span className="text-lg text-[#7FAA84] font-bold">
//                                         {item?.price} ₴
//                                       </span>

//                                       <ProductCount
//                                         count={item?.quantity}
//                                         itemId={item?.orderItemId}
//                                         isFromOrder={true}
//                                         savePrice={item?.priceForOne}
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                               );
//                             }
//                           )
//                         ) : (
//                           <div className="w-full h-full flex justify-center items-center">
//                             <h3 className="text-[#484848] text-sm">Корзина пуста:(</h3>
//                           </div>
//                         )}
//                       </Modal> */}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           ) : (
//             <div className="flex items-center justify-center w-full h-full">
//               <h3 className="text-base text-foreground">
//                 За вашим запитом товарів не знайдено...
//               </h3>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

import ImageNotFound from "/public/images/image-not-found.jpg";

import React, { useEffect, useRef, useState } from "react";
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

const SearchBar = () => {
  const [searchedItems, setSearchedItems] = useState<Item[]>([]);
  const [allItemsSearched, setAllItemSearched] = useState<Item[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsideSearch);

    return () => {
      window.removeEventListener("mousedown", clickOutsideSearch);
    };
  }, []);

  const onFocuseInput = async () => {
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

  const handleShowAll = () => {
    Cookies.set("__search_value", searchValue, { expires: 7, path: "/" });
    const url = qs.stringifyUrl({
      url: "/search",
      query: {
        searchValue,
      },
    });

    setIsShow(false);
    setIsFocusInput(false);
    return router.push(url);
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

  const handleSearchValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsShow(true);
      setSearchValue(e.target.value);
      const { products } = await getSearchProducts({
        searchValue: e.target.value,
      });

      const formateItems = products?.filter(
        (item: Item, idx: number) => idx < 4
      );

      if (!e.target.value) {
        setSearchedItems([]);
        setAllItemSearched([]);
        return;
      }

      setAllItemSearched(products);
      setSearchedItems(formateItems);
    } catch (error) {
      console.log(error);
    }
  };

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const onSubmit = (values: { __search_value: string }) => {
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
    return router.push(url);
  };

  return (
    <>
      <div className="relative w-full" ref={searchRef}>
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
                      onFocus={onFocuseInput}
                      onBlur={() => setIsFocusInput(false)}
                      value={searchValue}
                      onChange={handleSearchValue}
                      className="pr-14 outline-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2 absolute top-0 right-3 h-full">
              <div className="w-[1px] h-[24px] bg-[#B8B6B6]" />
              <Button type="submit" variant="ghost" className="p-0">
                <SearchIcon />
              </Button>
            </div>
          </form>
        </Form>

        {searchValue && isShow && (
          <div className="rounded-[4px] border border-solid shadow-md px-2 py-3 lg:p-4 max-h-80 bg-[#FFFDFD] overflow-y-auto absolute top-[105%] left-0 w-full flex flex-col gap-4">
            {searchedItems?.length > 0 ? (
              searchedItems?.map((item) => {
                return (
                  <div
                    className="pb-4 border-b border-[#F2F2F2]"
                    key={item?.id}
                  >
                    <Link
                      href={`/${item?.id}`}
                      onClick={() => setIsShow(false)}
                      className="grid grid-cols-2 md:flex md:items-start gap-3 p-4 hover:shadow-search-shadow transform transition-all duration-300 shadow-none"
                      key={item?.id}
                    >
                      <div className="rounded-md overflow-hidden w-auto h-20 md:w-20  relative">
                        {item?.images[0]?.url ? (
                          <Image
                            src={`${process.env.BACKEND_URL}/public/products/${item?.images[0]?.url}`}
                            alt={item?.title}
                            fill
                            objectFit="cover"
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
                          {USDollar.format(Number(item?.price))}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <h3 className="text-base text-center">
                За вашим запитом товарів не знайдено...
              </h3>
            )}

            {searchedItems?.length > 0 && (
              <Button
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
        <div className="fixed w-full h-full  bg-[#4848484D] top-0 left-0 -z-10" />
      )}
    </>
  );
};

export default SearchBar;
