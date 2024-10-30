"use client";
import Modal from "@/components/ui/modal";
import Available from "/public/images/available.svg";
import Bag from "/public/images/bag.svg";

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

  return (
    <li className="rounded-[5px] border border-[rgba(72,72,72,0.2)] overflow-hidden">
      <div className="flex flex-col">
        <Link
          href={`/${item?.id}`}
          className="aspect-video lg:aspect-square relative overflow-hidden"
        >
          <Image
            src={productImage}
            alt={item?.title}
            fill
            className="absolute top-0 left-0 object-cover"
          />
        </Link>

        <div className="px-[14px] py-5">
          <div className="flex flex-col gap-[25px]">
            <div className="flex flex-col gap-[15px]">
              <Link href={`/${item?.id}`}>
                <h2 className="font-bold text-base">{item?.title}</h2>
              </Link>
              <div className="flex flex-col gap-[13px]">
                <div className="flex items-center gap-[6px]">
                  <Available />
                  <span className="text-[#7FAA84] text-xs font-medium">
                    В наявності
                  </span>
                </div>

                <span className="text-[#484848] text-xs">
                  Артикул: {item?.article}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#7FAA84] font-bold text-base">
                {item?.price} ₴
              </span>
              <Modal
                triggetBtn={
                  <Button
                    variant="ghost"
                    className="hover:bg-none p-0"
                    onClick={() => handleAddItemToCart(item)}
                  >
                    <Bag />
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
                          className="flex items-start lg:items-center gap-[15px] w-full lg:border lg:border-solid lg:border-[#7FAA84] rounded-[5px]"
                          key={item?.orderItemId}
                        >
                          <div className="w-[65px] h-[65px] lg:w-[138px] lg:h-full rounded-[5px] overflow-hidden relative">
                            <Image
                              src={item?.images[0]?.url}
                              alt={item?.images[0]?.id}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col gap-[15px] lg:gap-[10px]  w-full lg:py-[10px]">
                            <div className="flex items-center justify-between w-full">
                              <h3 className="text-[#484848] text-sm underline w-[167px] lg:w-full">
                                {item?.title}
                              </h3>
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
    </li>
  );
};

export default ProductItem;
