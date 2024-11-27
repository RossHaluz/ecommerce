"use client";
import { Button } from "@/components/ui/button";
import React, { FC, useState } from "react";
import ArrowDown from "/public/images/arrow-down.svg";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import HistoryOrdersDelivary from "./history-orders-delivary";
import HistoryOrdersPayment from "./history-orders-payment";
import HistoryOrdersClient from "./history-orders-client";

interface HistoryOrdersListProps {
  ordersByUser: {
    id: string;
    city: string;
    firstName: string;
    lastName: string;
    phone: string;
    paymentMethod: string;
    postService: string;
    separation: string;
    address: string;
    typeDelivary: string;
    createdAt: string;
    orderItems: any[];
  }[];
}

const HistoryOrdersList: FC<HistoryOrdersListProps> = ({ ordersByUser }) => {
  const [isShowItems, setShowItems] = useState<string | null>(null);
  console.log(ordersByUser);

  return (
    <div className="w-full lg:border-l lg:border-[#c0092a] lg:pl-[30px]">
      <ul className="flex flex-col gap-4">
        {ordersByUser?.map((item) => {
          const createdAt = format(new Date(item?.createdAt), "dd.MM.yyyy");
          return (
            <li
              key={item?.id}
              className="flex flex-col gap-[15px] p-[15px] bg-[#F2F2F2] rounded-[5px]"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[#484848] text-base font-bold">
                  Замовлення № 1003
                </h3>
                <Button
                  variant="ghost"
                  className="p-0"
                  onClick={() =>
                    setShowItems((prev) =>
                      prev === item?.id ? null : item?.id
                    )
                  }
                >
                  <ArrowDown
                    className={`stroke-[#c0092a] transform transition-all duration-150 ${
                      isShowItems === item?.id && "rotate-180"
                    }`}
                  />
                </Button>
              </div>

              <span className="text-[#484848]">ТТН: 20450545678902</span>
              <span className="text-[#484848]">{createdAt}</span>
              <span className="text-[#c0092a]">Замовлення виконано</span>

              {isShowItems === item?.id && (
                <div className="flex flex-col gap-[15px]">
                  <div className="w-full h-[1px] bg-[#c0092a]" />
                  <div className="flex flex-col gap-4">
                    {item?.orderItems.map((item) => {
                      const totalPrice =
                        item?.quantity * Number(item?.product?.price);
                      return (
                        <div
                          className="flex items-start gap-[15px]"
                          key={item?.product?.id}
                        >
                          <div className="relative rounded-[5px] overflow-hidden w-20 h-20">
                            <Image
                              src={`${process.env.BACKEND_URL}/products/${item?.product?.images[0]?.url}`}
                              alt={item?.product?.title}
                              fill
                              objectFit="cover"
                            />
                          </div>

                          <div className="flex flex-col gap-[15px] w-full">
                            <div className="w-[175px] flex flex-col gap-[10px]">
                              <Link
                                href={`/${item?.product?.id}`}
                                className="underline text-[#484848] font-bold"
                              >
                                {item?.product?.title}
                              </Link>
                              <span className="text-[#484848] text-xs">
                                Артикул: {item?.product?.article}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-[#484848]">
                                {item?.quantity} товар на суму
                              </span>
                              <span className="text-[#c0092a] text-[18px] leading-[21.94px] font-bold">
                                {totalPrice}₴
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-full h-[1px] bg-[#c0092a]" />
                  <HistoryOrdersDelivary item={item} />
                  <div className="w-full h-[1px] bg-[#c0092a]" />
                  <HistoryOrdersPayment item={item} />
                  <div className="w-full h-[1px] bg-[#c0092a]" />
                  <HistoryOrdersClient item={item} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HistoryOrdersList;
