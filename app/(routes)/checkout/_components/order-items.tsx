"use client";
import { Button } from "@/components/ui/button";
import { selectOrderItems } from "@/redux/order/selector";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  currentPriceOrderItems,
  removeItemFromCart,
} from "@/redux/order/slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FC, useEffect } from "react";

interface OrderItemsProps {
  currentUser: {
    type: string;
  };
}

const OrderItems: FC<OrderItemsProps> = ({ currentUser }) => {
  const dispatch = useDispatch();
  const orderItems = useSelector(selectOrderItems);
  let totalPrice = 0;

  useEffect(() => {
    if (currentUser) {
      if (currentUser?.type === "drop") {
        dispatch(currentPriceOrderItems({ userType: "drop" }));
      } else if (currentUser?.type === "user") {
        dispatch(currentPriceOrderItems({ userType: "user" }));
      }
    } else {
      dispatch(currentPriceOrderItems({ userType: "user" }));
    }
  }, [dispatch, currentUser]);

  const handleRemoveItem = async (id: string) => {
    try {
      dispatch(removeItemFromCart(id));
      toast.success("Success remove item");
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
    <div className="p-[30px] rounded-[5px] bg-[#FFFDFD] sticky top-10  transition-all">
      <div className="flex flex-col gap-[30px]">
        <h3 className="text-[#484848] text-2xl font-bold">Ваш кошик</h3>

        {orderItems?.length > 0 ? (
          <div className="flex flex-col gap-[30px]">
            {orderItems?.map(
              (item: {
                id: string;
                quantity: number;
                price: number;
                product_name: string;
                orderItemId: string;
                priceForOne: number;
                title: string;
                article: string;
                images: {
                  id: string;
                  url: string;
                }[];
              }) => {
                const imageUrl = item?.images[0].url;

                totalPrice += Number(item?.price);
                return (
                  <div className="flex items-center gap-[30px]" key={item?.id}>
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveItem(item?.orderItemId)}
                    >
                      X
                    </Button>
                    <div className="w-[118px] h-[118px] rounded-[5px] overflow-hidden relative">
                      <Image
                        src={imageUrl}
                        alt={item?.title}
                        fill
                        className="object-cover absolute top-0 left-0"
                        priority
                        unoptimized={true}
                      />
                    </div>
                    <div className="flex flex-col gap-[15px]">
                      <Link
                        href={`/product/${item?.product_name}`}
                        className="text-base font-bold text-[#484848] underline"
                      >
                        {capitalizeFirstLetter(item?.title)}
                      </Link>

                      <div className="flex items-center gap-[10px]">
                        <span className="text-[#484848] font-medium text-base">
                          {item?.quantity}
                        </span>
                        <span className="text-[#484848]">x</span>
                        <span className="text-[#c0092a] text-base font-bold">
                          {Number(item?.priceForOne) === 0 && "Ціна договірна"}
                          {Number(item?.priceForOne) > 0 &&
                            USDollar.format(Number(item?.priceForOne))}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}

            <div className="w-full h-[1px] bg-[#c0092a]" />

            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#484848]">
                Загальна вартість:
              </h3>
              <span className="text-[#c0092a] text-base font-bold">
                {Number(totalPrice) === 0 && "Ціна договірна"}
                {Number(totalPrice) > 0 && USDollar.format(Number(totalPrice))}
              </span>
            </div>
          </div>
        ) : (
          <h3 className="text-base  text-foreground">Корзина пуста :(</h3>
        )}
      </div>
    </div>
  );
};

export default OrderItems;
