"use client";
import ImageNotFound from "/public/images/image-not-found.jpg";

import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "@/redux/order/slice";
import { useSelector } from "react-redux";
import { selectOrderItems } from "@/redux/order/selector";
import Trash from "/public/images/trash.svg";
import { nanoid } from "@reduxjs/toolkit";
import { selectCurrentCustomizer } from "@/redux/customizer/selectors";
import { cn } from "@/lib/utils";
import Head from "next/head";
import { sendGAEvent } from "@next/third-parties/google";

interface ProductItemProps {
  item: {
    id: string;
    title: string;
    price: string;
    article: string;
    priceForOne?: string;
    catalog_number: string;
    product_name: string;
    quantity?: number;
    images: {
      id: string;
      url: string;
    }[];
  };
}

const ProductItem: FC<ProductItemProps> = ({ item }) => {
  const router = useRouter();
  const productImage = item?.images?.map((item) => item?.url)[0];
  const dispatch = useDispatch();
  const orderItems = useSelector(selectOrderItems);
  const currentCustomizer = useSelector(selectCurrentCustomizer);

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleAddItemToCart = (data: {
    id: string;
    title: string;
    price: string;
    article: string;
    priceForOne?: string | "";
    quantity?: number;
    images: {
      id: string;
      url: string;
    }[];
  }) => {
    try {
      const itemToCart = {
        ...data,
        quantity: 1,
        price: Number(data.price),
        priceForOne: data.priceForOne
          ? Number(data.priceForOne)
          : Number(data.price),
        selectOptions: [],
        orderItemId: nanoid(),
      };

      sendGAEvent("event", "add_to_cart", {
        item_id: data.id,
        item_name: data.title,
        price: Number(data.price),
        currency: "USD",
      });
      dispatch(addItemToCart(itemToCart));
      toast.success("Item success add to cart");
    } catch (error) {
      toast.error("Something went wrong...");
    }
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
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <Head>
        {productImage && (
          <link
            rel="preload"
            as="image"
            href={`${process.env.BACKEND_URL}/products/${productImage}`}
          />
        )}
      </Head>
      <li
        className={cn("grid gap-2 bg-[#FFFDFD] rounded", {
          "grid-cols-5 p-4 md:p-6": currentCustomizer === "list",
          "grid-cols-1": currentCustomizer === "grid",
        })}
      >
        <Link
          href={`/product/${item?.product_name}`}
          className={cn("w-full", {
            "col-span-2": currentCustomizer === "list",
          })}
        >
          <div
            className={cn(
              "relative w-full h-auto overflow-hidden flex justify-center",
              {
                "h-full w-full": currentCustomizer === "list",
                "aspect-video w-full": currentCustomizer === "grid",
              }
            )}
          >
            {productImage ? (
              <Image
                src={`https://api.audiparts.site/products/${productImage}`}
                alt={item?.title || "Фото товару"}
                fill
                objectFit="contain"
                priority
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
        </Link>

        <div
          className={cn("flex flex-col gap-2 h-full md:justify-between", {
            "col-span-3": currentCustomizer === "list",
            "p-3": currentCustomizer === "grid",
          })}
        >
          <div className="flex flex-col gap-2 md:gap-4">
            <Link href={`/product/${item?.product_name}`}>
              <h2
                className={cn(
                  "text-[14px] leading-[17.07px] font-medium text-[#111111] uppercase line-clamp-2 md:text-[24px] md:leading-[33.6px]",
                  {
                    "md:text-[14px] md:leading-[17.07px]":
                      currentCustomizer === "grid",
                  }
                )}
              >
                {item?.title}
              </h2>
            </Link>

            <div className="flex items-center gap-2 justify-between">
              <h3
                className={cn(
                  "text-[10px] leading-[12.19px] md:text-[14px] md:leading-[17.07px]",
                  {
                    "text-center": currentCustomizer === "grid",
                  }
                )}
              >
                {item?.catalog_number}
              </h3>

              <h3 className="text-[10px] leading-[12.19px] md:text-[14px] md:leading-[17.07px]">
                {item?.article}
              </h3>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-reverse gap-2">
            <h3
              className={cn("text-sm font-semibold text-[#111111]", {
                "text-center": currentCustomizer === "grid",
              })}
            >
              {Number(item?.price) === 0 && "Ціна договірна"}
              {Number(item?.price) > 0 && USDollar.format(Number(item?.price))}
            </h3>

            <Modal
              triggetBtn={
                <Button
                  variant="ghost"
                  className="hover:bg-none bg-[#c0092a] max-w-max leading-[14.63px] font-medium p-[12.5px] md:py-[14px] lg:p-4 flex items-center justify-center text-[#FFFDFD]"
                  onClick={() => handleAddItemToCart(item)}
                >
                  Купити
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
                                        {item?.optionTitle}: {item?.optionValue}
                                      </h3>
                                    );
                                  }
                                )}
                              </div>
                              <Button
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
      </li>
    </>
  );
};

export default ProductItem;
