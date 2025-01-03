"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { addItemToCart, removeItemFromCart } from "@/redux/order/slice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Trash from "/public/images/trash.svg";
import ProductCount from "./product-count";
import { selectOrderItems } from "@/redux/order/selector";
import { nanoid } from "@reduxjs/toolkit";

interface ProductBtnCountProps {
  count: number | 1;
  setCurrentPrice: React.Dispatch<React.SetStateAction<number>>;
  savePrice: string;
}

interface ProductBtnProps {
  productOptions?: any[];
  priceForOne: string;
  selectOptions: any[];
  currentPrice: number;
  item: {
    priceForOne?: string;
    id: string;
    title: string;
    quantity?: number;
    productOptions: any[];
    price: string;
    article: string;
    images: {
      id: string;
      url: string;
    }[];
  };
}

const ProductBtn: FC<ProductBtnProps & ProductBtnCountProps> = ({
  selectOptions,
  currentPrice,
  item,
  count = 1,
  setCurrentPrice,
  priceForOne,
  savePrice,
  productOptions,
}) => {
  const router = useRouter();
  const orderItems = useSelector(selectOrderItems);
  const dispatch = useDispatch();

  const hansleDeleteItem = async (id: string) => {
    try {
      dispatch(removeItemFromCart(id));
      router.refresh();
      toast.success("Item success delete");
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  const handleAddItemToCart = async (data: ProductBtnProps) => {
    try {
      const { item, currentPrice, priceForOne } = data;
      const newItem = {
        ...item,
        orderItemId: nanoid(),
        price: Number(currentPrice),
        quantity: count || 1,
        priceForOne: Number(priceForOne),
        selectOptions: selectOptions,
      };

      dispatch(addItemToCart(newItem));

      toast.success("Item success add to cart");
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  const uppercaseFirstLater = (str: string) => {
    if (!str) return;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="w-full">
      <Modal
        triggetBtn={
          <Button
            className="w-full md:px-11 md:py-[10px] md:max-w-max"
            disabled={
              selectOptions?.length === 0 &&
              productOptions &&
              productOptions?.length > 0
                ? true
                : productOptions && productOptions?.length === 0 && false
            }
            onClick={() =>
              handleAddItemToCart({
                item,
                currentPrice,
                selectOptions,
                priceForOne,
              })
            }
          >
            Купити
          </Button>
        }
        title="Товар доданий до Вашого кошика!"
        dialogCancel={"Продовжити покупки"}
        dialogAction={
          <Link
            href="/"
            className="flex items-center justify-center text-white text-base font-semibold y-[10px]"
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
              orderItemId?: string;
              selectOptions: any[];
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
                      src={`${process.env.BACKEND_URL}/products/${item?.images[0]?.url}`}
                      alt={item?.images[0]?.id}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                  <div className="flex flex-col gap-[15px] lg:gap-[10px]  w-full lg:py-[10px]">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-[#484848] text-sm underline w-[167px] lg:w-full">
                          {uppercaseFirstLater(item?.title)}
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
                        onClick={() => {
                          if (item?.orderItemId) {
                            hansleDeleteItem(item.orderItemId);
                          }
                        }}
                      >
                        <Trash />
                      </Button>
                    </div>

                    <div className=" flex items-center  justify-between lg:items-start w-full lg:flex-col  lg:gap-[10px] ">
                      <span className="text-lg text-[#c0092a] font-bold">
                        {USDollar.format(item?.price)}
                      </span>
                      <ProductCount
                        count={item?.quantity}
                        itemId={item?.orderItemId}
                        isFromOrder={true}
                        savePrice={Number(savePrice)}
                        setCurrentPrice={setCurrentPrice}
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
  );
};

export default ProductBtn;
