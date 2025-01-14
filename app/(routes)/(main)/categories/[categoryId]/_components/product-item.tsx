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
import ProductCount from "@/app/(routes)/[productId]/_components/product-count";
import Trash from "/public/images/trash.svg";
import { nanoid } from "@reduxjs/toolkit";

interface ProductItemProps {
  item: {
    id: string;
    title: string;
    price: string;
    article: string;
    priceForOne?: string;
    catalog_number: string;
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
        price: Number(data.price), // Перетворення на число
        priceForOne: data.priceForOne
          ? Number(data.priceForOne)
          : Number(data.price), // Перетворення на число
        selectOptions: [],
        orderItemId: nanoid(),
      };

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
    <li className="grid grid-cols-5 gap-4 p-4 md:p-6 bg-[#FFFDFD] rounded">
      <Link href={`/${item?.id}`} className="col-span-2">
        <div className="relative overflow-hidden h-full w-full">
          {productImage ? (
            <Image
              src={`${process.env.BACKEND_URL}/public/products/${productImage}`}
              alt={item?.title}
              fill
              objectFit="contain"
              objectPosition="center center"
              unoptimized={true}
            />
          ) : (
            <Image
              src={ImageNotFound}
              alt="Image not found"
              fill
              objectFit="cover"
              unoptimized={true}
            />
          )}
        </div>
      </Link>

      <div className="flex flex-col gap-4 h-full md:justify-between col-span-3">
        <div className="flex flex-col gap-2 md:gap-4">
          <Link href={`/${item?.id}`}>
            <h2 className="text-[14px] leading-[17.07px] font-medium text-[#111111] uppercase line-clamp-2 md:text-[24px] md:leading-[33.6px]">
              {item?.title} - {item?.article}
            </h2>
          </Link>

          <div className="flex flex-col gap-1 md:gap-4">
            {/* <h3 className="text-[10px] leading-[12.19px] md:text-[14px] md:leading-[17.07px]">
              Код товару: {item?.article}
            </h3> */}
            <h3 className="text-[10px] leading-[12.19px] md:text-[14px] md:leading-[17.07px]">
              Каталожний номер: {item?.catalog_number}
            </h3>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-[14px] leading-[17.07px] md:text-[28px] md:leading-[34.13px]  font-semibold text-[#111111]">
            {Number(item?.price) === 0 && "Ціна договірна"}
            {Number(item?.price) > 0 && USDollar.format(Number(item?.price))}
          </h3>

          <Modal
            triggetBtn={
              <Button
                variant="ghost"
                className="hover:bg-none bg-[#c0092a] max-w-max leading-[14.63px] font-medium p-[12.5px] md:px-[73px] md:py-[14px] text-[#FFFDFD]"
                onClick={() => handleAddItemToCart(item)}
              >
                Додати до кошику
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
                      className="flex items-start lg:items-center gap-[15px] w-full lg:border lg:border-solid lg:border-[#c0092a] rounded-[5px]"
                      key={item?.orderItemId}
                    >
                      <div className="w-[65px] h-[65px] lg:w-[138px] lg:h-full rounded-[5px] overflow-hidden relative">
                        <Image
                          src={`${process.env.BACKEND_URL}/public/products/${item?.images[0]?.url}`}
                          alt={item?.title}
                          fill
                          objectFit="cover"
                          unoptimized={true}
                        />
                      </div>
                      <div className="flex flex-col gap-[15px] lg:gap-[10px]  w-full lg:py-[10px]">
                        <div className="flex items-center justify-between w-full">
                          <h3 className="text-[#484848] text-sm underline w-[167px] lg:w-full">
                            {capitalizeFirstLetter(item?.title)}
                          </h3>
                          <Button
                            variant="ghost"
                            onClick={() => hansleDeleteItem(item?.orderItemId)}
                          >
                            <Trash />
                          </Button>
                        </div>

                        <div className=" flex items-center  justify-between lg:items-start w-full lg:flex-col  lg:gap-[10px] ">
                          <span className="text-lg text-[#c0092a] font-bold">
                            {Number(item?.price) === 0 && "Ціна договірна"}
                            {Number(item?.price) > 0 &&
                              USDollar.format(Number(item?.price))}
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
    </li>
  );
};

export default ProductItem;
